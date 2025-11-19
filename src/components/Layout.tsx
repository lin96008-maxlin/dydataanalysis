import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

// 导航项配置
const navItems = [
  { id: 'home', title: '首页', icon: 'fa-home', path: '/' },
  { id: 'workbench', title: '全域研判工作台', icon: 'fa-chart-simple', path: '/workbench' },
  { id: 'ticket-quality-inspection', title: '工单标签质检', icon: 'fa-check-circle', path: '/ticket-quality-inspection' },
  { id: 'tag-operation', title: '标签运营', icon: 'fa-tags', path: '/tag-operation' },
  { id: 'tag-management', title: '标签管理', icon: 'fa-list-check', path: '/tag-management' },
  { id: 'relationship-graph', title: '关系图谱', icon: 'fa-network-wired', path: '/relationship-graph' },
  { id: 'theme-monitoring', title: '主题监测', icon: 'fa-magnifying-glass-chart', path: '/theme-monitoring' },
  { id: 'sampling-test', title: '抽样测试', icon: 'fa-vial', path: '/sampling-test' },
  { id: 'multi-dimension-analysis', title: '多维分析研判', icon: 'fa-chart-pie', path: '/multi-dimension-analysis' },
  { id: 'public-opinion', title: '社情民意汇聚', icon: 'fa-people-group', path: '/public-opinion' },
  { id: 'risk-assessment', title: '风险研判', icon: 'fa-triangle-exclamation', path: '/risk-assessment' },
  { id: 'report-management', title: '报表报告', icon: 'fa-file-lines', path: '/report-management' },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 判断当前路由是否匹配导航项
  const isActive = (path: string) => location.pathname === path;

  // 处理登出
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`flex h-screen overflow-hidden ${theme}`}>
      {/* 侧边栏 */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* 侧边栏头部 - 品牌标识 */}
        <div className={`p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700`}>
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h1 className="font-bold text-lg text-gray-800 dark:text-white">德阳市数据研判平台</h1>
            </div>
          )}
          {!isSidebarOpen && (
            <div className="bg-blue-600 text-white w-8 h-8 rounded flex items-center justify-center mx-auto">
              <i className="fa-solid fa-chart-line"></i>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          >
            <i className={`fa-solid ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
          </button>
        </div>

        {/* 侧边栏导航 */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-1">
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 text-sm rounded-lg transition-colors duration-200
                    ${isActive(item.path) 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }
                  `}
                >
                  <i className={`fa-solid ${item.icon} w-5 h-5 mr-3 text-center`}></i>
                  {isSidebarOpen && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 侧边栏底部 - 用户信息 */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">管理员</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-auto text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
        )}
        {!isSidebarOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
            <button 
              onClick={handleLogout}
              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              title="退出登录"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        )}
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 dark:text-gray-400 mr-4 lg:hidden"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {navItems.find(item => isActive(item.path))?.title || '首页'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
            >
              <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 relative">
                <i className="fa-solid fa-bell"></i>
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center ml-4">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                <i className="fa-solid fa-user"></i>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">管理员</span>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};