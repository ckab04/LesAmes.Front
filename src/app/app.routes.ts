import { Routes } from "@angular/router";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { Error404Component } from "./views/auth/error404/error404.component";
import { Error500Component } from "./views/auth/error500/error500.component";
import { MaintenanceComponent } from "./views/auth/maintenance/maintenance.component";
import { authGuard } from "./core/service/auth.guard";
import { ProjectComponent } from "./views/applications/projects/project/project.component";
import { ClientsComponent } from "./views/applications/projects/clients/clients.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { StarterComponent } from "./views/pages/starter/starter.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "projects",
    component: ProjectComponent,
    pathMatch: "full",
  },
  {
    path: "souls",
    component: ClientsComponent,
    pathMatch: "full",
  },
  {
    path: "",
    redirectTo: "dashboard/analytics",
    pathMatch: "full",
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () =>
      import("./views/views.route").then((mod) => mod.VIEW_ROUTES),
  },
  {
    path: "starter", // solution temporaire
    component: StarterComponent,
    pathMatch: "full",
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./views/pages/pages.route").then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./views/auth/auth.route").then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: "not-found",
    component: Error404Component,
    data: { title: "404 - Error" },
  },
  {
    path: "error-500",
    component: Error500Component,
    data: { title: "500 - Error" },
  },
  {
    path: "maintenance",
    component: MaintenanceComponent,
    data: { title: "Maintenance" },
  },
];
