"use client";

import { Sit, NewSitParams, insertSitParams } from "@/lib/db/schema/site";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const SitForm = ({
  sit,
  closeModal,
}: {
  sit?: Sit;
  closeModal: () => void;
}) => {
  const { toast } = useToast();
  
  const editing = !!sit?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSitParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSitParams),
    defaultValues: sit ?? {
      sitename: "",
     sitedescription: ""
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.site.getSite.invalidate();
    router.refresh();
    closeModal();toast({
      title: 'Success',
      description: `Sit ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createSit, isLoading: isCreating } =
    trpc.site.createSit.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateSit, isLoading: isUpdating } =
    trpc.site.updateSit.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteSit, isLoading: isDeleting } =
    trpc.site.deleteSit.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewSitParams) => {
    if (editing) {
      updateSit({ ...values, id: sit.id });
    } else {
      createSit(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="sitename"
          render={({ field }) => (<FormItem>
              <FormLabel>Sitename</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sitedescription"
          render={({ field }) => (<FormItem>
              <FormLabel>Sitedescription</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteSit({ id: sit.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SitForm;
