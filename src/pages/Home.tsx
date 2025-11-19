import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@/components/ui/Card';

// 主数据卡片配置
const mainCards = [
  {
    title: "全域研判工作台",
    description: "整合高频事件、敏感词、标签管理等核心数据，支撑宏观决策",
    icon: "fa-chart-simple",
    route: "/workbench",
    color: "bg-blue-600"
  },
  {
    title: "工单标签质检",
    description: "通过多维度条件精准查询工单标签质检情况，支撑标签质量核查",
    icon: "fa-check-circle",
    route: "/ticket-quality-inspection",
    color: "bg-green-600"
  },
  {
    title: "标签运营",
    description: "展示全量标签分类树及相关统计信息，支撑标签运营分析",
    icon: "fa-tags",
    route: "/tag-operation",
    color: "bg-purple-600"
  },
  {
    title: "标签管理",
    description: "通用标签核心信息展示与管理，支撑标签基础管理",
    icon: "fa-list-check",
    route: "/tag-management",
    color: "bg-amber-600"
  }
];

// 功能模块卡片配置
const featureCards = [
  {
    title: "关系图谱",
    description: "热点话题和主体的可视化展示与分析",
    icon: "fa-network-wired",
    route: "/relationship-graph",
    color: "bg-indigo-600"
  },
  {
    title: "主题监测",
    description: "监测方案的创建、管理与数据分析",
    icon: "fa-magnifying-glass-chart",
    route: "/theme-monitoring",
    color: "bg-pink-600"
  },
  {
    title: "抽样测试",
    description: "测试任务的执行、分析与报告生成",
    icon: "fa-vial",
    route: "/sampling-test",
    color: "bg-teal-600"
  },
  {
    title: "多维分析研判",
    description: "高频事件、话题、责任主体等多维度分析数据",
    icon: "fa-chart-pie",
    route: "/multi-dimension-analysis",
    color: "bg-orange-600"
  },
  {
    title: "社情民意汇聚",
    description: "区、街道、社区三级工作台与全流程研判",
    icon: "fa-people-group",
    route: "/public-opinion",
    color: "bg-red-600"
  },
  {
    title: "风险研判",
    description: "多维度识别潜在风险，展示各类风险预警",
    icon: "fa-triangle-exclamation",
    route: "/risk-assessment",
    color: "bg-rose-600"
  },
  {
    title: "报表报告",
    description: "智能报告管理与模板配置",
    icon: "fa-file-lines",
    route: "/report-management",
    color: "bg-cyan-600"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 顶部欢迎区域 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-b-xl shadow-lg mb-6"
      >
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">德阳市数据研判平台</h1>
          <p className="text-blue-100 text-lg">
            基于12345政务热线业务场景，实现工单标签全生命周期管理、多维度数据分析、风险预警及决策辅助
          </p>
        </div>
      </motion.div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 pb-12">
        {/* 主要功能卡片 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">主要功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mainCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link to={card.route}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-white">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-4 text-white`}>
                      <i className={`fa-solid ${card.icon} text-xl`}></i>
                    </div>
                    <Typography variant="h5" className="font-bold mb-2">{card.title}</Typography>
                    <Typography variant="body2" className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {card.description}
                    </Typography>
                    <div className="text-blue-600 dark:text-blue-400 flex items-center mt-auto">
                      <span className="mr-1">查看详情</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 功能模块卡片 */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">功能模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <Link to={card.route}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-white">
                  <CardContent className="p-5 h-full flex flex-col">
                    <div className={`w-10 h-10 rounded-full ${card.color} flex items-center justify-center mb-3 text-white`}>
                      <i className={`fa-solid ${card.icon} text-lg`}></i>
                    </div>
                    <Typography variant="h6" className="font-semibold mb-2">{card.title}</Typography>
                    <Typography variant="body2" className="text-gray-600 dark:text-gray-300 flex-grow">
                      {card.description}
                    </Typography>
                    <div className="text-blue-600 dark:text-blue-400 flex items-center mt-auto pt-2">
                      <span className="mr-1">进入</span>
                      <i className="fa-solid fa-arrow-right text-xs"></i>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}