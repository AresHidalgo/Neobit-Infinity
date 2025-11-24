import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routesConfig } from "@/config/app.config";
import { PrivateRoute } from "./guards/PrivateRoute";
import { PublicRoute } from "./guards/PublicRoute";
import { SellerRoute } from "./guards/SellerRoute";
import { AdminRoute } from "./guards/AdminRoute";
import { MainLayout } from "@/shared/components/layouts/MainLayout";
import { AuthLayout } from "@/shared/components/layouts/AuthLayout";
import { DashboardLayout } from "@/shared/components/layouts/DashboardLayout";
import { SellerDashboardLayout } from "@/shared/components/layouts/SellerDashboardLayout";
import { AdminDashboardLayout } from "@/shared/components/layouts/AdminDashboardLayout";

// Lazy load modules for code splitting
const Home = lazy(() =>
  import("@/modules/marketplace/views/Home").then((m) => ({ default: m.Home }))
);
const Search = lazy(() =>
  import("@/modules/search/views/Search").then((m) => ({ default: m.Search }))
);
const ProductDetail = lazy(() =>
  import("@/modules/product/views/ProductDetail").then((m) => ({
    default: m.ProductDetail,
  }))
);
const Cart = lazy(() =>
  import("@/modules/cart/views/Cart").then((m) => ({ default: m.Cart }))
);
const Checkout = lazy(() =>
  import("@/modules/checkout/views/Checkout").then((m) => ({
    default: m.Checkout,
  }))
);
const Orders = lazy(() =>
  import("@/modules/orders/views/Orders").then((m) => ({ default: m.Orders }))
);
const OrderDetail = lazy(() =>
  import("@/modules/orders/views/OrderDetail").then((m) => ({
    default: m.OrderDetail,
  }))
);
const Wishlist = lazy(() => import("@/modules/wishlist/views/Wishlist"));
const Compare = lazy(() => import("@/modules/comparisons/views/Compare"));
const Alerts = lazy(() => import("@/modules/alerts/views/Alerts"));
const Profile = lazy(() => import("@/modules/profile/views/Profile"));
const Login = lazy(() =>
  import("@/modules/auth/views/Login").then((m) => ({ default: m.Login }))
);
const Register = lazy(() =>
  import("@/modules/auth/views/Register").then((m) => ({ default: m.Register }))
);
const AdminDashboard = lazy(
  () => import("@/modules/admin/views/AdminDashboard")
);
const UsersAdmin = lazy(() => import("@/modules/admin/users/UsersAdmin"));
const ProductsAdmin = lazy(
  () => import("@/modules/admin/products/ProductsAdmin")
);
const AnalyticsAdmin = lazy(
  () => import("@/modules/admin/analytics/AnalyticsAdmin")
);

// About views
const About = lazy(() =>
  import("@/modules/about/views/About").then((m) => ({ default: m.About }))
);
const AboutHistory = lazy(() =>
  import("@/modules/about/views/AboutHistory").then((m) => ({
    default: m.AboutHistory,
  }))
);
const AboutTeam = lazy(() =>
  import("@/modules/about/views/AboutTeam").then((m) => ({
    default: m.AboutTeam,
  }))
);
const AboutValues = lazy(() =>
  import("@/modules/about/views/AboutValues").then((m) => ({
    default: m.AboutValues,
  }))
);

// Contact views
const Contact = lazy(() =>
  import("@/modules/contact/views/Contact").then((m) => ({
    default: m.Contact,
  }))
);
const ContactSupport = lazy(() =>
  import("@/modules/contact/views/ContactSupport").then((m) => ({
    default: m.ContactSupport,
  }))
);
const ContactSales = lazy(() =>
  import("@/modules/contact/views/ContactSales").then((m) => ({
    default: m.ContactSales,
  }))
);
const ContactPartner = lazy(() =>
  import("@/modules/contact/views/ContactPartner").then((m) => ({
    default: m.ContactPartner,
  }))
);

// Services views
const Services = lazy(() =>
  import("@/modules/services/views/Services").then((m) => ({
    default: m.Services,
  }))
);
const ServicesSupport = lazy(() =>
  import("@/modules/services/views/ServicesSupport").then((m) => ({
    default: m.ServicesSupport,
  }))
);
const ServicesWarranty = lazy(() =>
  import("@/modules/services/views/ServicesWarranty").then((m) => ({
    default: m.ServicesWarranty,
  }))
);
const ServicesShipping = lazy(() =>
  import("@/modules/services/views/ServicesShipping").then((m) => ({
    default: m.ServicesShipping,
  }))
);

// Policies views
const Policies = lazy(() =>
  import("@/modules/policies/views/Policies").then((m) => ({
    default: m.Policies,
  }))
);
const PoliciesPrivacy = lazy(() =>
  import("@/modules/policies/views/PoliciesPrivacy").then((m) => ({
    default: m.PoliciesPrivacy,
  }))
);
const PoliciesTerms = lazy(() =>
  import("@/modules/policies/views/PoliciesTerms").then((m) => ({
    default: m.PoliciesTerms,
  }))
);
const PoliciesReturns = lazy(() =>
  import("@/modules/policies/views/PoliciesReturns").then((m) => ({
    default: m.PoliciesReturns,
  }))
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route element={(<MainLayout />) as any}>
          <Route path={routesConfig.home} element={<Home />} />
          <Route path={routesConfig.products.search} element={<Search />} />
          <Route
            path={`${routesConfig.products.list}/:id`}
            element={<ProductDetail />}
          />

          {/* About Routes */}
          <Route path={routesConfig.about.index} element={<About />} />
          <Route path={routesConfig.about.history} element={<AboutHistory />} />
          <Route path={routesConfig.about.team} element={<AboutTeam />} />
          <Route path={routesConfig.about.values} element={<AboutValues />} />

          {/* Contact Routes */}
          <Route path={routesConfig.contact.index} element={<Contact />} />
          <Route
            path={routesConfig.contact.support}
            element={<ContactSupport />}
          />
          <Route path={routesConfig.contact.sales} element={<ContactSales />} />
          <Route
            path={routesConfig.contact.partner}
            element={<ContactPartner />}
          />

          {/* Services Routes */}
          <Route path={routesConfig.services.index} element={<Services />} />
          <Route
            path={routesConfig.services.support}
            element={<ServicesSupport />}
          />
          <Route
            path={routesConfig.services.warranty}
            element={<ServicesWarranty />}
          />
          <Route
            path={routesConfig.services.shipping}
            element={<ServicesShipping />}
          />

          {/* Policies Routes */}
          <Route path={routesConfig.policies.index} element={<Policies />} />
          <Route
            path={routesConfig.policies.privacy}
            element={<PoliciesPrivacy />}
          />
          <Route
            path={routesConfig.policies.terms}
            element={<PoliciesTerms />}
          />
          <Route
            path={routesConfig.policies.returns}
            element={<PoliciesReturns />}
          />
        </Route>

        {/* Auth Routes */}
        <Route element={(<AuthLayout />) as any}>
          <Route
            path={routesConfig.auth.login}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path={routesConfig.auth.register}
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route element={(<MainLayout />) as any}>
          <Route
            path={routesConfig.cart}
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path={routesConfig.checkout}
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path={routesConfig.orders.list}
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path={`${routesConfig.orders.list}/:id`}
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path={routesConfig.wishlist}
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path={routesConfig.comparisons}
            element={
              <PrivateRoute>
                <Compare />
              </PrivateRoute>
            }
          />
          <Route
            path={routesConfig.alerts}
            element={
              <PrivateRoute>
                <Alerts />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Dashboard Routes */}
        <Route element={(<DashboardLayout />) as any}>
          <Route
            path={routesConfig.profile}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Seller Routes */}
        <Route element={(<SellerDashboardLayout />) as any}>
          <Route
            path={routesConfig.seller.dashboard}
            element={
              <SellerRoute>
                <div>Seller Dashboard</div>
              </SellerRoute>
            }
          />
          <Route
            path={routesConfig.seller.products}
            element={
              <SellerRoute>
                <div>Seller Products</div>
              </SellerRoute>
            }
          />
          <Route
            path={routesConfig.seller.orders}
            element={
              <SellerRoute>
                <div>Seller Orders</div>
              </SellerRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route element={(<AdminDashboardLayout />) as any}>
          <Route
            path={routesConfig.admin.dashboard}
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path={routesConfig.admin.users}
            element={
              <AdminRoute>
                <UsersAdmin />
              </AdminRoute>
            }
          />
          <Route
            path={routesConfig.admin.products}
            element={
              <AdminRoute>
                <ProductsAdmin />
              </AdminRoute>
            }
          />
          <Route
            path={routesConfig.admin.analytics}
            element={
              <AdminRoute>
                <AnalyticsAdmin />
              </AdminRoute>
            }
          />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to={routesConfig.home} replace />} />
      </Routes>
    </Suspense>
  );
}
