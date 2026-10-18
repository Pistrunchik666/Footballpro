import { createFileRoute } from "@tanstack/react-router";
import { ManagerApp } from "@/fm/ui";

export const Route = createFileRoute("/")({ component: ManagerApp });
