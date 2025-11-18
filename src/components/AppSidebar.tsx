import { Users, MessageCircle, TrendingUp, Target, GitBranch, ListChecks, Settings, FolderOpen } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const tools = [
  { title: "Проекты", url: "/", icon: FolderOpen },
  { title: "Анализ ЦА", url: "/audience", icon: Users },
  { title: "Кастдев", url: "/custdev", icon: MessageCircle },
  { title: "Анализ рынка", url: "/market", icon: TrendingUp },
  { title: "Создание оффера", url: "/offer", icon: Target },
  { title: "Схема воронки", url: "/funnel", icon: GitBranch },
  { title: "Декомпозиция", url: "/decomposition", icon: ListChecks },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Инструменты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.url}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={tool.url} 
                      end={tool.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings"
                    className="hover:bg-sidebar-accent"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Настройки</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
