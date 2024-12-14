"use client";

import {
  getFormProps,
  getInputProps,
  SubmissionResult,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { startTransition, useActionState, useOptimistic } from "react";
import { Todo, todosSchema } from "./schema";

type Action<State, Payload> = (
  state: Awaited<State>,
  payload: Payload,
) => State | Promise<State>;

export function Todos({
  initialTodos,
  action,
}: {
  initialTodos: Todo[];
  action: Action<
    { lastResult: SubmissionResult | null; todos: Todo[] },
    FormData
  >;
}) {
  const [{ lastResult, todos }, formAction, isSubmitting] = useActionState(
    action,
    {
      lastResult: null,
      todos: initialTodos,
    },
  );
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    (_prevTodos, nextTodos: Todo[]) => nextTodos,
  );
  const [form, fields] = useForm({
    lastResult,
    defaultValue: { todos },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: todosSchema });
    },
    onSubmit(event, { submission, formData }) {
      event.preventDefault();

      if (submission?.status !== "success") return;

      startTransition(async () => {
        setOptimisticTodos(submission.value.todos);
        formAction(formData);
      });
    },
  });
  const todosFieldList = fields.todos.getFieldList();

  return (
    <div className="flex gap-4 w-full">
      <div className="p-4 border-2 border-dotted border-purple-400 flex-2">
        <h2 className="text-xl mb-2">Form</h2>
        <form {...getFormProps(form)} action={formAction}>
          <ul className="flex flex-col gap-1">
            {todosFieldList.map((todoField, index) => {
              const todoFields = todoField.getFieldset();
              const optimisticTodo = optimisticTodos.find(
                (todo) => todo.id === Number(todoFields.id.value),
              );
              const persistedTodo = todos.find(
                (todo) => todo.id === optimisticTodo?.id,
              );

              return (
                <li key={todoField.key}>
                  <div className="flex gap-1">
                    <input
                      {...getInputProps(todoFields.id, { type: "hidden" })}
                      key={todoFields.id.key}
                    />
                    <label htmlFor={todoFields.title.id} className="flex-1">
                      Todo {todoFields.id.value}{" "}
                      {persistedTodo == null ? " (not persisted)" : ""}:
                    </label>
                    <input
                      {...getInputProps(todoFields.title, { type: "text" })}
                      key={todoFields.title.key}
                      className="bg-slate-900 flex-1"
                    />
                    <button
                      {...form.remove.getButtonProps({
                        name: fields.todos.name,
                        index,
                      })}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {Object.entries(form.allErrors).map(([path, error]) => (
            <div key={path} className="text-red-500 text-sm">
              {path}: {error}
            </div>
          ))}
          <div className="flex gap-1 justify-between">
            <button
              {...form.insert.getButtonProps({
                name: fields.todos.name,
                defaultValue: { id: todosFieldList.length, title: "" },
              })}
            >
              Add todo
            </button>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <div className="p-4 border-2 border-dotted border-purple-400 flex-1">
        <h2 className="text-xl mb-2">Todos</h2>
        <ul>
          {optimisticTodos.map((optimisticTodo) => {
            const persistedTodo = todos.find(
              (todo) => todo.id === optimisticTodo.id,
            );

            return (
              <li key={optimisticTodo.id}>
                Todo {optimisticTodo.id}: {optimisticTodo.title}
                {persistedTodo == null ? " (not persisted)" : ""}
                {persistedTodo !== optimisticTodo ? " (optimistic)" : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
