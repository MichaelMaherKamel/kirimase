"use client";

import { Tod, NewTodParams, insertTodParams } from "@/lib/db/schema/todo";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const TodForm = ({
  tod,
  closeModal,
}: {
  tod?: Tod;
  closeModal: () => void;
}) => {
  const { toast } = useToast();
  const { data: computers } = trpc.computers.getComputers.useQuery();
  const editing = !!tod?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertTodParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTodParams),
    defaultValues: tod ?? {
      name: "",
     description: "",
     computerId: 0
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.todo.getTodo.invalidate();
    router.refresh();
    closeModal();toast({
      title: 'Success',
      description: `Tod ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createTod, isLoading: isCreating } =
    trpc.todo.createTod.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateTod, isLoading: isUpdating } =
    trpc.todo.updateTod.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteTod, isLoading: isDeleting } =
    trpc.todo.deleteTod.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewTodParams) => {
    if (editing) {
      updateTod({ ...values, id: tod.id });
    } else {
      createTod(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="computerId"
          render={({ field }) => (<FormItem>
              <FormLabel>Computer Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a computer" />
                  </SelectTrigger>
                  <SelectContent>
                    {computers?.computers.map((computer) => (
                      <SelectItem key={computer.id} value={computer.id.toString()}>
                        {computer.id}  {/* TODO: Replace with a field from the computer model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            onClick={() => deleteTod({ id: tod.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TodForm;
