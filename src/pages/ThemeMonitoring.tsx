import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 监测方案数据
const monitoringPlans = [
  {
    id: 1,
    name: '城市管理问题专项监测',
    status: '运行中',
    createTime: '2023-10-15 09:30:00',
    creator: '系统管理员',
    latestTicketTime: '2023-11-18 09:15:00',
    demandCount: 128
  },
  {
    id: 2,
    name: '交通拥堵热点监测',
    status: '运行中',
    createTime: '2023-10-20 14:20:00',
    creator: '数据分析员',
    latestTicketTime: '2023-11-17 16:45:00',
    demandCount: 95
  },
  {
    id: 3,
    name: '物业管理投诉分析',
    status: '已暂停',
    createTime: '2023-10-25 10:15:00',
    creator: '业务审核员',
    latestTicketTime: '2023-11-10 11:30:00',
    demandCount: 76
  },
  {
    id: 4,
    name: '环境保护热点问题跟踪',
    status: '运行中',
    createTime: '2023-11-01 15:50:00',
    creator: '系统管理员',
    latestTicketTime: '2023-11-18 08:45:00',
    demandCount: 68
  },
  {
    id: 5,
    name: '教育资源分配问题监测',
    status: '已结束',
    createTime: '2023-10-10 11:25:00',
    creator: '数据分析员',
    latestTicketTime: '2023-11-05 14:20:00',
    demandCount: 52
  }
];

// 趋势数据
const trendData = [
  { date: '11月12日', count: 15 },
  { date: '11月13日', count: 20 },
  { date: '11月14日', count: 18 },
  { date: '11月15日', count: 25 },
  { date: '11月16日', count: 22 },
  { date: '11月17日', count: 28 },
  { date: '11月18日', count: 24 },
];

// 区域分布数据
const regionData = [
  { name: '旌阳区', count: 45 },
  { name: '罗江区', count: 28 },
  { name: '中江县', count: 22 },
  { name: '广汉市', count: 18 },
  { name: '什邡市', count: 15 },
  { name: '绵竹市', count: 12 },
];

// 责任主体分布数据
const subjectData = [
  { name: '市住建局', value: 35 },
  { name: '市公安局', value: 25 },
  { name: '市交通局', value: 15 },
  { name: '市环保局', value: 12 },
  { name: '其他部门', value: 13 },
];

// 工单性质分布数据
const natureData = [
  { name: '投诉类', value: 65 },
  { name: '咨询类', value: 15 },
  { name: '求助类', value: 12 },
  { name: '建议类', value: 8 },
];

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function ThemeMonitoring() {
  const [searchParams, setSearchParams] = useState({
    createTime: '近30天',
    themeName: '',
    creator: '',
    status: '全部'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(monitoringPlans);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'distribution'>('overview');

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [searchParams, currentPage, pageSize]);

  // 处理搜索参数变化
  const handleParamChange = (key: string, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // 重置为第一页
  };

  // 重置搜索条件
  const resetSearch = () => {
    setSearchParams({
      createTime: '近30天',
      themeName: '',
      creator: '',
      status: '全部'
    });
    setCurrentPage(1);
  };

  // 处理方案操作
  const handlePlanOperation = (operation: string, plan: any) => {
    switch(operation) {
      case 'view':
        setSelectedPlan(plan);
        break;
      case 'edit':
        alert(`编辑方案 ${plan.name} 功能已触发`);
        break;
      case 'start':
        if (window.confirm(`确定要启动方案 ${plan.name} 吗？`)) {
          alert(`启动方案 ${plan.name} 功能已触发`);
        }
        break;
      case 'pause':
        if (window.confirm(`确定要暂停方案 ${plan.name} 吗？`)) {
          alert(`暂停方案 ${plan.name} 功能已触发`);
        }
        break;
      case 'delete':
        if (window.confirm(`确定要删除方案 ${plan.name} 吗？此操作不可恢复。`)) {
          alert(`删除方案 ${plan.name} 功能已触发`);
        }
        break;
      case 'copy':
        alert(`复制方案 ${plan.name} 功能已触发`);
        break;
      default:
        break;
    }
  };

  // 新增监测方案
  const handleAddPlan = () => {
    alert('新增监测方案功能已触发');
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch(status) {
      case '运行中':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '已暂停':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '已结束':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setSelectedPlan(null);
  };

  // 导出数据
  const handleExportData = () => {
    alert('导出数据功能已触发');
  };

  // 生成报告
  const handleGenerateReport = () => {
    alert('生成报告功能已触发');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">主题监测</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">查看已创建的主题监测方案，支撑方案管理</p>
      </div>

      {selectedPlan ? (
        // 方案详情视图
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h5" className="font-bold text-gray-800 dark:text-white">{selectedPlan.name}</Typography>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={handleCloseDetail}
                  >
                    <i className="fa-solid fa-arrow-left mr-1"></i>返回列表
                  </button>
                </div>

                {/* 方案基础信息 */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">方案基础信息</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">方案状态</p>
                      <span className={getStatusStyle(selectedPlan.status)}>
                        {selectedPlan.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">创建人</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedPlan.creator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">创建时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedPlan.createTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">最新工单时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedPlan.latestTicketTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">诉求数</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedPlan.demandCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">联系方式</p>
                      <p className="text-sm text-gray-800 dark:text-white">138****1234</p>
                    </div>
                  </div>

                  {/* 监测条件 */}
                  <div className="mt-4">
                    <div className="flex items-center cursor-pointer" onClick={() => {}}>
                      <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white">监测条件</Typography>
                      <i className="fa-solid fa-chevron-down ml-2 text-gray-500 dark:text-gray-400 text-xs"></i>
                    </div>
                    <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">基础条件：</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">工单性质：投诉类、求助类</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">标签条件：</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">话题标签：城市管理问题、交通拥堵</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 数据可视化标签页 */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                    <button
                      className={`py-2 px-4 font-medium text-sm border-b-2 ${
                        activeTab === 'overview' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      数据概览
                    </button>
                    <button
                      className={`py-2 px-4 font-medium text-sm border-b-2 ${
                        activeTab === 'distribution' 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('distribution')}
                    >
                      诉求分布
                    </button>
                  </div>

                  {/* 数据概览 */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* 数字卡片 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">累计诉求数</p>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{selectedPlan.demandCount}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">今日新增诉求</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">12</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">涉及区域数</p>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">6</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">涉及责任主体</p>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">12</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">平均处置时长</p>
                          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">48小时</p>
                        </div>
                      </div>

                      {/* 趋势图表 */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white">近7天诉求数变化</Typography>
                            <div className="flex space-x-2">
                              <button className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">按日</button>
                              <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">按小时</button>
                            </div>
                          </div>
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
                    </div>
                  )}

                  {/* 诉求分布 */}
                  {activeTab === 'distribution' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 区域分布 */}
                      <Card>
                        <CardContent className="p-4">
                          <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">区域分布（TOP10）</Typography>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={regionData}>
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

                      {/* 责任主体分布 */}
                      <Card>
                        <CardContent className="p-4">
                          <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">责任主体分布</Typography>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={subjectData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {subjectData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  formatter={(value) => [`${value}件`, '工单数量']}
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

                      {/* 工单性质分布 */}
                      <Card className="md:col-span-2">
                        <CardContent className="p-4">
                          <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">工单性质分布</Typography>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={natureData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={100}
                                  innerRadius={60}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {natureData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  formatter={(value) => [`${value}件`, '工单数量']}
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
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-4">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                    onClick={handleExportData}
                  >
                    <i className="fa-solid fa-file-export mr-2"></i>导出数据
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleGenerateReport}
                  >
                    <i className="fa-solid fa-file-pdf mr-2"></i>生成报告
                  </button>
                  {selectedPlan.status === '运行中' && (
                    <button 
                      className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center"
                      onClick={() => handlePlanOperation('pause', selectedPlan)}
                    >
                      <i className="fa-solid fa-pause mr-2"></i>暂停
                    </button>
                  )}
                  {selectedPlan.status === '已暂停' && (
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                      onClick={() => handlePlanOperation('start', selectedPlan)}
                    >
                      <i className="fa-solid fa-play mr-2"></i>启动
                    </button>
                  )}
                </div></CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        // 方案列表视图
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
                  {/* 创建时间 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">创建时间</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.createTime}
                        onChange={(e) => handleParamChange('createTime', e.target.value)}
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

                  {/* 主题名称 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">主题名称</label>
                    <input
                      type="text"
                      value={searchParams.themeName}
                      onChange={(e) => handleParamChange('themeName', e.target.value)}
                      placeholder="请输入主题名称关键词"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>

                  {/* 创建人 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">创建人</label>
                    <input
                      type="text"
                      value={searchParams.creator}
                      onChange={(e) => handleParamChange('creator', e.target.value)}
                      placeholder="请输入创建人姓名关键词"
                      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                    />
                  </div>

                  {/* 方案状态 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">方案状态</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.status}
                        onChange={(e) => handleParamChange('status', e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="运行中">运行中</option>
                        <option value="已暂停">已暂停</option>
                        <option value="已结束">已结束</option>
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

          {/* 方案列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-0">
                {/* 列表头部 */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">监测方案列表</Typography>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleAddPlan}
                  >
                    <i className="fa-solid fa-plus mr-2"></i>新增监测方案
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
                              主题名称
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              方案状态
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              创建时间
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              创建人
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              最新工单时间
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              诉求数
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {filteredData.map((plan) => (
                            <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {plan.name}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={getStatusStyle(plan.status)}>
                                  {plan.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {plan.createTime}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {plan.creator}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {plan.latestTicketTime}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {plan.demandCount}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                                  onClick={() => handlePlanOperation('view', plan)}
                                >
                                  查看详情
                                </button>
                                {(plan.status === '已暂停' || plan.status === '已结束') && (
                                  <button 
                                    className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mr-2"
                                    onClick={() => handlePlanOperation('edit', plan)}
                                  >
                                    编辑
                                  </button>
                                )}
                                {plan.status === '运行中' && (
                                  <button 
                                    className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 mr-2"
                                    onClick={() => handlePlanOperation('pause', plan)}
                                  >
                                    暂停
                                  </button>
                                )}
                                {plan.status === '已暂停' && (
                                  <button 
                                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-2"
                                    onClick={() => handlePlanOperation('start', plan)}
                                  >
                                    启动
                                  </button>
                                )}
                                {plan.status === '已结束' && (
                                  <button 
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mr-2"
                                    onClick={() => handlePlanOperation('delete', plan)}
                                  >
                                    删除
                                  </button>
                                )}
                                <button 
                                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                                  onClick={() => handlePlanOperation('copy', plan)}
                                >
                                  复制
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