import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard }            from './services/auth-guard.service';

import { LoginComponent }       from './pages/login/login.component';
import { SelectionComponent }   from './pages/selection/selection.component';
import { CategoryComponent }    from './pages/category/category.component';
import { ProductComponent }     from './pages/product/product.component';
import { ShoppingCartComponent }     from './pages/shoppingCart/shoppingCart.component';
import { BillComponent }            from './pages/bill/bill.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/selection',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/:token',
        component: LoginComponent
    },
    {
        path: 'selection',
        component: SelectionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'selection/:id',
        component: SelectionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'category/:id',
        component: CategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product/:id',
        component: ProductComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'shoppingCart',
        component: ShoppingCartComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bill',
        component: BillComponent,
        canActivate: [AuthGuard]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);