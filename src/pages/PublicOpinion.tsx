import { useState } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Empty } from '@/components/Empty';

// 数据概览卡片数据
const overviewCards = [
  { id: 1, title: '事件总数', value: 1258, trend: 'up', change: '2.3%', icon: 'fa-clipboard-list', color: 'bg-blue-600/10', textColor: 'text-blue-600 dark:text-blue-400' },
  { id: 2, title: '处置中', value: 157, trend: 'down', change: '1.8%', icon: 'fa-spinner', color: 'bg-amber-600/10', textColor: 'text-amber-600 dark:text-amber-400' },
  { id: 3, title: '已办结', value: 1082, trend: 'up', change: '3.1%', icon: 'fa-check-circle', color: 'bg-green-600/10', textColor: 'text-green-600 dark:text-green-400' },
  { id: 4, title: '办结率', value: '86.0%', trend: 'down', change: '1.2%', icon: 'fa-percentage', color: 'bg-red-600/10', textColor: 'text-red-600 dark:text-red-400' }
];

// 事件来源分布数据
const sourceData = [
  { name: '线上APP', value: 45 },
  { name: '网站', value: 20 },
  { name: '电话', value: 30 },
  { name: '其他', value: 5 }
];

// 市民满意度数据
const satisfactionData = [
  { name: '满意率', value: 89 },
  { name: '好评数', value: 1120 },
  { name: '差评数', value: 138 }
];

// 今日到期工单数据
const dueTicketsData = [
  { name: '今日到期', value: 45 },
  { name: '逾期预警', value: 12 }
];

// 区域事件分布数据
const regionData = [
  { name: '旌阳区', count: 285 },
  { name: '罗江区', count: 195 },
  { name: '中江县', count: 245 },
  { name: '广汉市', count: 220 },
  { name: '什邡市', count: 168 },
  { name: '绵竹市', count: 145 }
];

// 业务类型数据
const businessTypeData = [
  { name: '物业管理', count: 320 },
  { name: '交通出行', count: 285 },
  { name: '环境保护', count: 195 },
  { name: '公共设施', count: 168 },
  { name: '市场监管', count: 145 },
  { name: '教育资源', count: 145 }
];

// 重点督办数据
const supervisionData = [
  { name: '重点督办', value: 35 },
  { name: '领导批示', value: 12 }
];

// 共治主体数据
const 共治主体Data = [
  { name: '市住建局', count: 320, rate: 92 },
  { name: '市公安局', count: 285, rate: 95 },
  { name: '市交通局', count: 195, rate: 88 },
  { name: '市环保局', count: 168, rate: 85 },
  { name: '市市场监管局', count: 145, rate: 82 },
  { name: '其他部门', count: 145, rate: 80 }
];

// 全流程用时数据
const processTimeData = [
  { name: '分拨环节', avgTime: 2.5, overdue: 5 },
  { name: '授权审批', avgTime: 1.2, overdue: 2 },
  { name: '责任单位处置', avgTime: 48.5, overdue: 18 },
  { name: '结案环节', avgTime: 1.8, overdue: 3 }
];

// 趋势数据
const trendData = [
  { date: '11月12日', count: 45 },
  { date: '11月13日', count: 52 },
  { date: '11月14日', count: 48 },
  { date: '11月15日', count: 60 },
  { date: '11月16日', count: 55 },
  { date: '11月17日', count: 58 },
  { date: '11月18日', count: 62 }
];

// 超期类型分布
const overdueTypeData = [
  { name: '分拨超期', value: 15 },
  { name: '处置超期', value: 65 },
  { name: '审批超期', value: 10 },
  { name: '其他超期', value: 10 }
];

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function PublicOpinion() {
  const [selectedLevel, setSelectedLevel] = useState<'district' | 'street' | 'community'>('district');
  const [selectedTime, setSelectedTime] = useState('本月');
  const [selectedRegion, setSelectedRegion] = useState('全部');
  const [activeTab, setActiveTab] = useState<'overview' | 'process'>('overview');
  const [processTimeView, setProcessTimeView] = useState<'comparison' | 'trend' | 'overdue'>('comparison');
  const [processTrendPeriod, setProcessTrendPeriod] = useState<'day' | 'week'>('day');

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">社情民意汇聚</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">面向区、街道、社区三级用户，提供层级化事件概览看板，支撑分级管理</p>
      </div>

      {/* 标签页切换 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'overview' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            三级工作台
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'process' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('process')}
          >
            全流程研判工作台
          </button>
        </div>
      </motion.div>

      {activeTab === 'overview' ? (
        // 三级工作台
        <>
          {/* 层级切换和筛选 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 层级切换 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">层级选择</label>
                    <div className="flex rounded-md shadow-sm">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-l-md border border-r-0 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
                          selectedLevel === 'district' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''
                        }`}
                        onClick={() => setSelectedLevel('district')}
                      >
                        区层级
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
                          selectedLevel === 'street' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''
                        }`}
                        onClick={() => setSelectedLevel('street')}
                      >
                        街道层级
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 ${
                          selectedLevel === 'community' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''
                        }`}
                        onClick={() => setSelectedLevel('community')}
                      >
                        社区层级
                      </button>
                    </div>
                  </div>

                  {/* 时间筛选 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">时间</label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option value="今天">今天</option>
                        <option value="本周">本周</option>
                        <option value="本月">本月</option>
                        <option value="本季度">本季度</option>
                        <option value="本年">本年</option>
                        <option value="自定义">自定义</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 区域筛选 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">区域</label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="全部">全部</option>
                        {selectedLevel === 'district' && (
                          <>
                            <option value="旌阳区">旌阳区</option>
                            <option value="罗江区">罗江区</option>
                            <option value="中江县">中江县</option>
                            <option value="广汉市">广汉市</option>
                            <option value="什邡市">什邡市</option>
                            <option value="绵竹市">绵竹市</option>
                          </>
                        )}
                        {selectedLevel === 'street' && (
                          <>
                            <option value="城北街道">城北街道</option>
                            <option value="城南街道">城南街道</option>
                            <option value="工农街道">工农街道</option>
                            <option value="旌阳街道">旌阳街道</option>
                          </>
                        )}
                        {selectedLevel === 'community' && (
                          <>
                            <option value="东湖社区">东湖社区</option>
                            <option value="西山社区">西山社区</option>
                            <option value="白河社区">白河社区</option>
                            <option value="红光社区">红光社区</option>
                          </>
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-rotate mr-2"></i>刷新数据
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-file-export mr-2"></i>导出报表
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-table-list mr-2"></i>切换视图
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 工作台看板 - 2x4 网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 事件概览卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">事件概览</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    {overviewCards.map((card) => (
                      <div key={card.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                          <div className={`w-8 h-8 rounded-full ${card.color} flex items-center justify-center ${card.textColor}`}>
                            <i className={`fa-solid ${card.icon}`}></i>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{card.value}</p>
                        <p className={`text-xs mt-1 flex items-center ${card.trend === 'up' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          <i className={`fa-solid fa-arrow-${card.trend} mr-1`}></i> 较上期{card.trend === 'up' ? '上升' : '下降'}{card.change}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 事件来源分布卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">事件来源分布</Typography>
                  <div className="flex items-center">
                    <div className="w-1/2">
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={sourceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, '占比']}
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderColor: '#e5e7eb',
                              borderRadius: '0.375rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2">
                      {sourceData.map((item, index) => (
                        <div key={index} className="flex items-center mb-3">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{item.name}</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{item.value}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 市民满意度卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">市民满意度</Typography>
                  <div className="grid grid-cols-3 gap-4">
                    {satisfactionData.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                        <p className={`text-2xl font-bold mt-1 ${index === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                          {item.value}
                          {index === 0 && '%'}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看差评详情</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 今日到期工单卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">今日到期工单</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    {dueTicketsData.map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg ${index === 0 ? 'bg-amber-50 dark:bg-amber-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                        <p className={`text-2xl font-bold mt-1 ${index === 0 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看详情</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 事件属地卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">
                    事件属地 TOP10 ({selectedLevel === 'district' ? '区→街道' : selectedLevel === 'street' ? '街道→社区' : '社区'})
                  </Typography>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {regionData.slice(0, 5).map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                          <span className="text-sm font-bold text-gray-800 dark:text-white">{item.count}</span>
                        </div>
                        <div className="mt-1">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(item.count / Math.max(...regionData.map(d => d.count))) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看全部</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 业务类型卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">业务类型 TOP10</Typography>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={businessTypeData}
                        margin={{ top: 5, right: 5, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.375rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 重点督办卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">重点督办</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    {supervisionData.map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                        <p className={`text-2xl font-bold mt-1 ${index === 0 ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}`}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看督办列表</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 共治主体卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">共治主体</Typography>
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {共治主体Data.slice(0, 5).map((item, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                          <span className={`text-sm font-bold ${item.rate < 90 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {item.rate}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2">
                            <div className={`h-1.5 rounded-full ${item.rate < 90 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${item.rate}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{item.count}件</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看全部</button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      ) : (
        // 全流程研判工作台
        <>
          {/* 筛选条件卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 时间筛选 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">时间</label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      >
                        <option value="本周">本周</option>
                        <option value="本月">本月</option>
                        <option value="本季度">本季度</option>
                        <option value="自定义">自定义</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 处置单位 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">处置单位</label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="市住建局">市住建局</option>
                        <option value="市公安局">市公安局</option>
                        <option value="市交通局">市交通局</option>
                        <option value="市环保局">市环保局</option>
                        <option value="市市场监管局">市市场监管局</option>
                        <option value="市教育局">市教育局</option>
                        <option value="市卫健委">市卫健委</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 工单类型 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">工单类型</label>
                    <div className="relative">
                      <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="投诉类">投诉类</option>
                        <option value="咨询类">咨询类</option>
                        <option value="建议类">建议类</option>
                        <option value="求助类">求助类</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-rotate mr-2"></i>刷新数据
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-file-pdf mr-2"></i>导出分析报告
                  </button>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center">
                    <i className="fa-solid fa-floppy-disk mr-2"></i>保存配置
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 核心统计区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 平均总用时 */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">平均总用时</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">48.5小时</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                      <i className="fa-solid fa-arrow-up mr-1"></i> 较上周上升 2.3%
                    </p>
                  </div>

                  {/* 超期工单占比 */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">超期工单占比</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">8.2%</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                      <i className="fa-solid fa-arrow-up mr-1"></i> 较上周上升 1.5%
                    </p>
                  </div>

                  {/* 环节超期率 */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">环节超期率 TOP3</p>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-700 dark:text-gray-300">责任单位处置:</span>
                        <span className="text-xs font-medium text-red-600 dark:text-red-400">8.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-700 dark:text-gray-300">分拨环节:</span>
                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">5.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-700 dark:text-gray-300">结案环节:</span>
                        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">3.0%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 用时分析区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                      className={`py-3 px-6 font-medium text-sm border-b-2 ${
                        processTimeView === 'comparison' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setProcessTimeView('comparison')}
                    >
                      分环节用时
                    </button>
                    <button
                      className={`py-3 px-6 font-medium text-sm border-b-2 ${
                        processTimeView === 'trend' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setProcessTimeView('trend')}
                    >
                      用时趋势
                    </button>
                    <button
                      className={`py-3 px-6 font-medium text-sm border-b-2 ${
                        processTimeView === 'overdue' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setProcessTimeView('overdue')}
                    >
                      超期分析
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* 分环节用时 */}
                  {processTimeView === 'comparison' && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {processTimeData.map((item) => (
                          <div key={item.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white mt-1">{item.avgTime}小时</p>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                              <i className="fa-solid fa-circle-exclamation mr-1"></i> 超期{item.overdue}件
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={processTimeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderColor: '#e5e7eb',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Legend />
                            <Bar dataKey="avgTime" name="平均用时(小时)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="overdue" name="超期数量" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* 用时趋势 */}
                  {processTimeView === 'trend' && (
                    <div>
                      <div className="flex justify-end mb-4">
                        <div className="flex space-x-2">
                          <button
                            className={`text-xs px-3 py-1 rounded-full ${
                              processTrendPeriod === 'day' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                            onClick={() => setProcessTrendPeriod('day')}
                          >
                            按日
                          </button>
                          <button
                            className={`text-xs px-3 py-1 rounded-full ${
                              processTrendPeriod === 'week' 
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            }`}
                            onClick={() => setProcessTrendPeriod('week')}
                          >
                            按周
                          </button>
                        </div>
                      </div>
                      
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                borderColor: '#e5e7eb',
                                borderRadius: '0.375rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="count" 
                              stroke="#3b82f6" 
                              strokeWidth={2}
                              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                              activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                              name="工单数量"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {/* 超期分析 */}
                  {processTimeView === 'overdue' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">超期类型分布</Typography>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={overdueTypeData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                {overdueTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value) => [`${value}%`, '占比']}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                  borderColor: '#e5e7eb',
                                  borderRadius: '0.375rem',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">超期原因分析</Typography>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">序号</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">超期环节</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">超期原因</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">涉及工单</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">占比</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">1</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">责任单位处置</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">人员不足</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">15</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">45.5%</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">2</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">责任单位处置</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">流程复杂</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">10</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">30.3%</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">3</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">分拨环节</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">责任不清</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">5</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">15.2%</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">4</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">结案环节</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">确认延误</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">3</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">9.1%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 操作按钮 */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center">
                      <i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>查看超期详情
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}