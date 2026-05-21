import {
  LayoutDashboard,
  Package,
  Building2,
  AlertTriangle,
  ArrowLeftRight,
  PackageSearch,
  ClipboardList,
  Truck,
  FileText,
  Users,
  MessageSquare,
  CreditCard,
  ArrowUpDown,
  BarChart2,
  Settings,
  UserCog,
  Wrench,
  Palette,
  Bell,
  Monitor,
  HelpCircle,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Moshe',
    email: 'moshe@company.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'My Company',
      logo: Command,
      plan: 'Inventory Pro',
    },
    {
      name: 'Team 2',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Team 3',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Inventory',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Products',
          url: '/inventory/products',
          icon: Package,
        },
        {
          title: 'Suppliers',
          url: '/crm/suppliers',
          icon: Building2,
        },
        {
          title: 'Stock Management',
          icon: PackageSearch,
          items: [
            {
              title: 'Stock History',
              url: '/inventory/history',
              icon: ArrowLeftRight,
            },
            {
              title: 'Low Stock',
              url: '/inventory/low-stock',
              icon: AlertTriangle,
            },
          ],
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          title: 'Sales',
          icon: ClipboardList,
          items: [
            {
              title: 'Sales Orders',
              url: '/sales/orders',
              icon: ClipboardList,
            },
            {
              title: 'Shipments',
              url: '/sales/shipments',
              icon: Truck,
            },
            {
              title: 'Invoices',
              url: '/sales/invoices',
              icon: FileText,
            },
            {
              title: 'Customers',
              url: '/crm/customers',
              icon: Users,
            },
          ],
        },
        {
          title: 'Financial',
          icon: CreditCard,
          items: [
            {
              title: 'Payments',
              url: '/finance/payments',
              icon: CreditCard,
            },
            {
              title: 'Transactions',
              url: '/finance/transactions',
              icon: ArrowUpDown,
            },
            {
              title: 'Reports',
              url: '/reports',
              icon: BarChart2,
            },
          ],
        },
        {
          title: 'Chats',
          url: '/chats',
          icon: MessageSquare,
          badge: '3',
        },
      ],
    },
    {
      title: 'Others',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
