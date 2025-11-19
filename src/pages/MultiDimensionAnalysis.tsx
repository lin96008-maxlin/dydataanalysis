import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 高频事件数据
const highFrequencyEvents = [
  { id: 1, name: '城市管理问题', count: 285, level: '一般', topicName: '城市管理', subjectName: '市住建局', status: '处置中' },
  { id: 2, name: '环境卫生', count: 243, level: '一般', topicName: '环境保护', subjectName: '市环保局', status: '处置中' },
  { id: 3, name: '物业管理', count: 210, level: '重要', topicName: '社区服务', subjectName: '区住建局', status: '处置中' },
  { id: 4, name: '交通拥堵', count: 198, level: '紧急', topicName: '交通出行', subjectName: '市交警支队', status: '处置中' },
  { id: 5, name: '公共设施损坏', count: 176, level: '一般', topicName: '公共设施', subjectName: '市住建局', status: '已完成' },
  { id: 6, name: '噪音污染', count: 154, level: '一般', topicName: '环境保护', subjectName: '市环保局', status: '已完成' },
  { id: 7, name: '市场监管问题', count: 132, level: '重要', topicName: '市场监管', subjectName: '市市场监管局', status: '处置中' },
  { id: 8, name: '教育资源分配', count: 110, level: '一般', topicName: '教育服务', subjectName: '市教育局', status: '处置中' },
  { id: 9, name: '医疗服务质量', count: 98, level: '重要', topicName: '医疗健康', subjectName: '市卫健委', status: '已完成' },
  { id: 10, name: '社会保障咨询', count: 86, level: '一般', topicName: '社会保障', subjectName: '市人社局', status: '已完成' }
];

// 话题分析数据
const topicAnalysisData = [
  { name: '城市管理', count: 285 },
  { name: '环境保护', count: 243 },
  { name: '社区服务', count: 210 },
  { name: '交通出行', count: 198 },
  { name: '公共设施', count: 176 },
  { name: '市场监管', count: 132 },
  { name: '教育服务', count: 110 },
  { name: '医疗健康', count: 98 },
  { name: '社会保障', count: 86 },
  { name: '其他问题', count: 75 }
];

// 责任主体分析数据
const subjectAnalysisData = [
  { name: '市住建局', count: 461, rate: 92 },
  { name: '市环保局', count: 397, rate: 88 },
  { name: '区住建局', count: 210, rate: 85 },
  { name: '市交警支队', count: 198, rate: 90 },
  { name: '市市场监管局', count: 132, rate: 82 },
  { name: '市教育局', count: 110, rate: 87 },
  { name: '市卫健委', count: 98, rate: 94 },
  { name: '市人社局', count: 86, rate: 89 },
  { name: '其他部门', count: 75, rate: 80 }
];

// 趋势分析数据
const trendData = [
  { date: '11月12日', count: 120 },
  { date: '11月13日', count: 135 },
  { date: '11月14日', count: 150 },
  { date: '11月15日', count: 142 },
  { date: '11月16日', count: 168 },
  { date: '11月17日', count: 155 },
  { date: '11月18日', count: 170 }
];

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function MultiDimensionAnalysis() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'events'>('overview');
  const [searchParams, setSearchParams] = useState({
    reportDate: '近30天',
    region: '全部',
    subject: '',
    eventStatus: '全部',
    eventLevel: '全部'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(highFrequencyEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [detailTab, setDetailTab] = useState<'analysis' | 'tickets'>('analysis');

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [selectedTab, searchParams, currentPage, pageSize]);

  // 处理搜索参数变化
  const handleParamChange = (key: string, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));setCurrentPage(1); // 重置为第一页
  };

  // 重置搜索条件
  const resetSearch = () => {
    setSearchParams({
      reportDate: '近30天',
      region: '全部',
      subject: '',
      eventStatus: '全部',
      eventLevel: '全部'
    });
    setCurrentPage(1);
  };

  // 获取事件等级样式
  const getEventLevelStyle = (level: string) => {
    switch(level) {
      case '紧急':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case '重要':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case '一般':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 处理事件操作
  const handleEventOperation = (operation: string, event: any) => {
    switch(operation) {
      case 'view':
        setSelectedEvent(event);
        break;
      case 'viewTickets':
        alert(`查看事件 ${event.name} 关联工单功能已触发`);
        break;
      case 'markLevel':
        alert(`标记事件 ${event.name} 等级功能已触发`);
        break;
      default:
        break;
    }
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  // 生成研判报告
  const handleGenerateReport = () => {
    alert('生成研判报告功能已触发');
  };

  // 导出列表
  const handleExportList = () => {
    alert('导出列表功能已触发');
  };

  // 导出数据
  const handleExportData = () => {
    alert('导出数据功能已触发');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">标签多维展示研判</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">展示高频事件、话题、责任主体等多维度分析数据，支撑综合研判</p>
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
              selectedTab === 'overview' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setSelectedTab('overview')}
            disabled={selectedEvent !== null}
          >
            多维度分析总览
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              selectedTab === 'events' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setSelectedTab('events')}
            disabled={selectedEvent !== null}
          >
            高频事件查看
          </button>
          {selectedEvent && (
            <button
              className={`py-3 px-6 font-medium text-sm border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400`}
            >
              事件详情
            </button>
          )}
        </div>
      </motion.div>

      {selectedEvent ? (
        // 事件详情视图
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h5" className="font-bold text-gray-800 dark:text-white">{selectedEvent.name}</Typography>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={handleCloseDetail}
                  >
                    <i className="fa-solid fa-arrow-left mr-1"></i>返回列表
                  </button>
                </div>

                {/* 事件基础信息 */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">事件基础信息</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">事件等级</p>
                      <span className={getEventLevelStyle(selectedEvent.level)}>
                        {selectedEvent.level}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">话题名称</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.topicName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">责任主体</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.subjectName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">诉求数</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">统计时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">2023-10-19 至 2023-11-18</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">首次发生时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">2023-10-19 10:15:00</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">最近发生时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.status === '处置中' ? '2023-11-18 09:30:00' : '2023-11-10 16:45:00'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">事件状态</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedEvent.status}</p>
                    </div>
                  </div>
                </div>

                {/* 事件分析标签页 */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                      className={`py-2 px-4 font-medium text-sm border-b-2 ${
                        detailTab === 'analysis' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setDetailTab('analysis')}
                    >
                      事件分析
                    </button>
                    <button
                      className={`py-2 px-4 font-medium text-sm border-b-2 ${
                        detailTab === 'tickets' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setDetailTab('tickets')}
                    >
                      工单列表
                    </button>
                  </div>

                  {/* 事件分析 */}
                  {detailTab === 'analysis' && (
                    <div className="space-y-6">
                      {/* 核心数据 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">话题</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{selectedEvent.topicName}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">责任主体</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{selectedEvent.subjectName}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">诉求数</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">{selectedEvent.count}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">诉求人数</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">186</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">涉及社区数</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">24</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">处置单位数</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">8</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">平均情绪值</p>
                          <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">6.8/10</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">诉求处置率</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">89.2%</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">超期处置数</p>
                          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">12</p>
                        </div>
                      </div>

                      {/* 趋势图表 */}
                      <Card>
                        <CardContent className="p-4">
                          <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">热点事件演化分析（近14天诉求数）</Typography>
                          <div className="h-64">
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
                        </CardContent>
                      </Card>

                      {/* 分布图表 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 性质分析 */}
                        <Card>
                          <CardContent className="p-4">
                            <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">性质分析</Typography>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: '投诉类', value: 65 },
                                      { name: '咨询类', value: 15 },
                                      { name: '求助类', value: 12 },
                                      { name: '建议类', value: 8 }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {[0, 1, 2, 3].map((index) => (
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
                          </CardContent>
                        </Card>

                        {/* 处置单位分布 */}
                        <Card>
                          <CardContent className="p-4">
                            <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">处置单位分布</Typography>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                  { name: '市住建局', count: 120 },
                                  { name: '市环保局', count: 95 },
                                  { name: '市交警支队', count: 85 },
                                  { name: '区住建局', count: 75 },
                                  { name: '其他部门', count: 60 }
                                ]}>
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
                                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* 工单列表 */}
                  {detailTab === 'tickets' && (
                    <Card>
                      <CardContent className="p-0">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                          <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">关联工单列表</Typography>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  工单编号
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  上报时间
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  诉求内容
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  所属区域
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  责任主体
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  处置状态
                                </th>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  操作
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {/* 模拟数据 - 实际应用中应从API获取 */}
                              {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                    {`202311${(10 + index).toString().padStart(2, '0')}${(100 + index).toString()}`}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {`2023-11-${(10 + index).toString().padStart(2, '0')} 10:30:00`}
                                  </td>
                                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                                    {`关于${selectedEvent.name}的投诉内容描述，包含具体情况和诉求。`}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    旌阳区
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {selectedEvent.subjectName}
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className={index % 3 === 0 ? 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}>
                                      {index % 3 === 0 ? '已办结' : '处置中'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                      查看详情
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* 分页 */}
                        <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6 flex items-center justify-between">
                          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                显示第 <span className="font-medium">1</span> 到 <span className="font-medium">5</span> 条，共 <span className="font-medium">{selectedEvent.count}</span> 条结果
                              </p>
                            </div>
                            <div>
                              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button 
                                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                  disabled={currentPage === 1}
                                >
                                  <i className="fa-solid fa-angle-left"></i>
                                </button>
                                <button 
                                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                                >
                                  1
                                </button>
                                <button 
                                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                >
                                  2
                                </button>
                                <button 
                                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                                >
                                  3
                                </button>
                                <button 
                                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                >
                                  <i className="fa-solid fa-angle-right"></i>
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end">
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleGenerateReport}
                  >
                    <i className="fa-solid fa-file-pdf mr-2"></i>生成研判报告
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : selectedTab === 'overview' ? (
        // 多维度分析总览视图
        <>
          {/* 搜索条件卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 统计时间 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">统计时间</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.reportDate}
                        onChange={(e) => handleParamChange('reportDate', e.target.value)}
                      >
                        <option value="今天">今天</option>
                        <option value="本周">本周</option>
                        <option value="本月">本月</option>
                        <option value="近7天">近7天</option>
                        <option value="近30天">近30天</option>
                        <option value="近90天">近90天</option>
                        <option value="自定义">自定义</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 区域 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">区域</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.region}
                        onChange={(e) => handleParamChange('region', e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="旌阳区">旌阳区</option>
                        <option value="罗江区">罗江区</option>
                        <option value="中江县">中江县</option>
                        <option value="广汉市">广汉市</option>
                        <option value="什邡市">什邡市</option>
                        <option value="绵竹市">绵竹市</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex justify-end">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                    onClick={() => console.log('搜索')}
                  >
                    <i className="fa-solid fa-search mr-2"></i>查询
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleExportData}
                  >
                    <i className="fa-solid fa-file-export mr-2"></i>导出数据
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 数据看板区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 高频事件卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">高频事件 TOP10</Typography>
                    <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline" onClick={() => setSelectedTab('events')}>
                      查看详情
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {highFrequencyEvents.slice(0, 10).map((event, index) => (
                      <div key={event.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{event.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200 mr-2">{event.count}</span>
                          <span className={getEventLevelStyle(event.level)}>
                            {event.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 话题分析卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">话题分析 TOP10</Typography>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={topicAnalysisData}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
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

            {/* 责任主体分析卡片 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">责任主体分析 TOP10</Typography>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {subjectAnalysisData.map((subject, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{subject.name}</span>
                          <span className={`text-sm font-bold ${subject.rate < 80 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                            {subject.rate}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${subject.rate < 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                              style={{ width: `${subject.rate}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{subject.count}件</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* 额外分析卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 趋势分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">诉求趋势分析（近7天）</Typography>
                  <div className="h-[300px]">
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
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={{ r: 4, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 6, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
                          name="工单数量"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 诉求人分析 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">诉求人分析</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">高发诉求人数量</p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">56</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">较上月增长 12%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">人均诉求次数</p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">3.2</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">较上月下降 8%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">重复诉求率</p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">15.6%</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">较上月增长 2.3%</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">重点关注人数</p>
                      <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">12</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">近30天诉求≥5次</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      ) : (
        // 高频事件查看视图
        <>
          {/* 搜索条件卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* 统计时间 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">统计时间</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.reportDate}
                        onChange={(e) => handleParamChange('reportDate', e.target.value)}
                      >
                        <option value="今天">今天</option>
                        <option value="本周">本周</option>
                        <option value="本月">本月</option>
                        <option value="近7天">近7天</option>
                        <option value="近30天">近30天</option>
                        <option value="近90天">近90天</option>
                        <option value="自定义">自定义</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 责任主体 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">责任主体</label>
                    <input
                      type="text"
                      value={searchParams.subject}
                      onChange={(e) => handleParamChange('subject', e.target.value)}
                      placeholder="请输入责任主体关键词"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>

                  {/* 事件状态 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">事件状态</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.eventStatus}
                        onChange={(e) => handleParamChange('eventStatus', e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="处置中">处置中</option>
                        <option value="已完成">已完成</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>

                  {/* 事件等级 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">事件等级</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.eventLevel}
                        onChange={(e) => handleParamChange('eventLevel', e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="一般">一般</option>
                        <option value="重要">重要</option>
                        <option value="紧急">紧急</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-6 flex justify-end">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                    onClick={() => console.log('搜索')}
                  >
                    <i className="fa-solid fa-search mr-2"></i>查询
                  </button>
                  <button 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                    onClick={resetSearch}
                  >
                    <i className="fa-solid fa-rotate-left mr-2"></i>重置
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 事件列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">高频事件列表</Typography>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleExportList}
                  >
                    <i className="fa-solid fa-file-export mr-2"></i>导出列表
                  </button>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredData.length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              序号
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              事件名称
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              事件等级
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              话题名称
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              责任主体
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              诉求数
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              状态名称
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredData.map((event, index) => (
                            <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                {event.name}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={getEventLevelStyle(event.level)}>
                                  {event.level}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {event.topicName}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {event.subjectName}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {event.count}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {event.status}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                                  onClick={() => handleEventOperation('view', event)}
                                >
                                  查看详情
                                </button>
                                <button 
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mr-2"
                                  onClick={() => handleEventOperation('viewTickets', event)}
                                >
                                  查看工单
                                </button>
                                <button 
                                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                                  onClick={() => handleEventOperation('markLevel', event)}
                                >
                                  标记等级
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* 分页 */}
                    <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6 flex items-center justify-between">
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            显示第 <span className="font-medium">1</span> 到 <span className="font-medium">{Math.min(pageSize, filteredData.length)}</span> 条，共 <span className="font-medium">{filteredData.length}</span> 条结果
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button 
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled={currentPage === 1}
                            >
                              <i className="fa-solid fa-angles-left"></i>
                            </button>
                            <button 
                              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled={currentPage === 1}
                            >
                              <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <button 
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400"
                            >
                              1
                            </button>
                            <button 
                              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled={currentPage === 1}
                            >
                              <i className="fa-solid fa-angle-right"></i>
                            </button>
                            <button 
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled={currentPage === 1}
                            >
                              <i className="fa-solid fa-angles-right"></i>
                            </button>
                          </nav>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">每页显示：</span>
                          <select 
                            className="block w-20 pl-2 pr-8 py-1 text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-white dark:bg-gray-800 dark:text-white"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                          >
                            <option value={10}>10条</option>
                            <option value={20}>20条</option>
                            <option value={50}>50条</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}