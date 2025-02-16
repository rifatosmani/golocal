import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./features/main/pages/starter/starter.page').then(m => m.StarterPage),
    },
    {
        path: 'login',
        loadComponent: () => import('./features/main/pages/login/login.page').then(m => m.LoginPage),
    },
    {
      path: 'signup',
      loadComponent: () => import('./features/main/pages/signup/signup.page').then(m => m.SignupPage),
  },
    {
    path: 'test',
    loadComponent: () => import('./test/test.page').then( m => m.TestPage)
    },
    {
      path: 'users',
      loadComponent: () => import('./features/main/pages/users/users.page').then( m => m.UsersPage)
    },
    {
      path: 'chat',
      loadComponent: () => import('./features/chat/components/chat.component').then( m => m.ChatComponent)
    },
  {
    path: 'home',
    loadComponent: () => import('./features/main/pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'site/:id',
    loadComponent: () => import('./features/main/pages/site/site.page').then( m => m.SitePage)
  },
  {
    path: 'my-sites',
    loadComponent: () => import('./features/creator/pages/my-sites/my-sites.page').then( m => m.MySitesPage)
  },
   {
    path: 'add-site',
    loadComponent: () => import('./features/creator/pages/add-site/add-site.page').then( m => m.AddSitePage)
  },
  {
    path: 'add-site/:id',
    loadComponent: () => import('./features/creator/pages/add-site/add-site.page').then( m => m.AddSitePage)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }, 
  
// Redirect to 'home'

]

