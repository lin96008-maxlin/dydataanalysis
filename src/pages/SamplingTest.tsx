import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 抽样测试任务数据
const samplingTasks = [
  {
    id: 1,
    subject: '城市管理问题标签准确性测试',
    status: '执行中',
    createTime: '2023-11-15 09:30:00',
    creator: '系统管理员',
    totalTickets: 200,
    progress: 65
  },
  {
    id: 2,
    subject: '交通拥堵标签匹配度测试',
    status: '待执行',
    createTime: '2023-11-14 14:20:00',
    creator: '数据分析员',
    totalTickets: 150,
    progress: 0
  },
  {
    id: 3,
    subject: '物业管理投诉标签质量评估',
    status: '已完成',
    createTime: '2023-11-10 10:15:00',
    creator: '业务审核员',
    totalTickets: 100,
    progress: 100
  },
  {
    id: 4,
    subject: '环境保护热点标签分类测试',
    status: '执行中',
    createTime: '2023-11-08 15:50:00',
    creator: '系统管理员',
    totalTickets: 180,
    progress: 42
  },
  {
    id: 5,
    subject: '教育资源标签完整性测试',
    status: '已完成',
    createTime: '2023-11-05 11:25:00',
    creator: '数据分析员',
    totalTickets: 120,
    progress: 100
  }
];

// 样本工单数据
const sampleTickets = [
  {
    id: 101,
    ticketType: '投诉类',
    problemDescription: '市区某路段道路施工导致交通拥堵严重',
    eventSummary: '城市道路施工引发的交通问题',
    topicTags: ['道路施工', '交通拥堵', '城市管理'],
    subjectTags: ['市住建局', '市交警支队'],
    otherTags: ['早高峰', '施工延误'],
    reviewStatus: '已复检',
    reviewResult: '正确'
  },
  {
    id: 102,
    ticketType: '咨询类',
    problemDescription: '咨询关于老年人医疗保险报销流程的问题',
    eventSummary: '医保政策咨询',
    topicTags: ['医疗保险', '报销流程', '政策咨询'],
    subjectTags: ['市医保局'],
    otherTags: ['老年人服务'],
    reviewStatus: '已复检',
    reviewResult: '错误'
  },
  {
    id: 103,
    ticketType: '建议类',
    problemDescription: '建议在小区周边增设公共健身器材',
    eventSummary: '社区公共设施建议',
    topicTags: ['公共设施', '健身器材', '社区建设'],
    subjectTags: ['市体育局', '区住建局'],
    otherTags: ['社区服务'],
    reviewStatus: '待复检',
    reviewResult: ''
  },
  {
    id: 104,
    ticketType: '求助类',
    problemDescription: '请求帮助解决小区停水问题',
    eventSummary: '居民生活用水问题',
    topicTags: ['供水问题', '居民生活', '紧急求助'],
    subjectTags: ['市自来水公司', '区住建局'],
    otherTags: ['紧急情况'],
    reviewStatus: '待复检',
    reviewResult: ''
  },
  {
    id: 105,
    ticketType: '表扬类',
    problemDescription: '表扬社区工作人员热心服务',
    eventSummary: '社区服务表扬',
    topicTags: ['社区服务', '表扬感谢', '工作人员'],
    subjectTags: ['区民政局'],
    otherTags: ['正面评价'],
    reviewStatus: '已复检',
    reviewResult: '正确'
  }
];

// 复检结果统计数据
const reviewResultData = [
  { name: '正确', value: 3, color: '#10b981' },
  { name: '错误', value: 1, color: '#ef4444' },
  { name: '待复检', value: 1, color: '#f59e0b' }
];

// 标签错误类型统计数据
const errorTypeData = [
  { name: '话题标签错误', count: 1 },
  { name: '主体标签错误', count: 0 },
  { name: '地理标签错误', count: 0 },
  { name: '时间标签错误', count: 0 },
  { name: '其他标签错误', count: 0 }
];

export default function SamplingTest() {
  const [searchParams, setSearchParams] = useState({
    createTime: '近30天',
    subject: '',
    creator: '',
    status: '全部'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(samplingTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

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
      subject: '',
      creator: '',
      status: '全部'
    });
    setCurrentPage(1);
  };

  // 处理任务操作
  const handleTaskOperation = (operation: string, task: any) => {
    switch(operation) {
      case 'view':
        setSelectedTask(task);
        break;
      case 'start':
        if (window.confirm(`确定要开始测试任务 ${task.subject} 吗？`)) {
          alert(`开始测试任务 ${task.subject} 功能已触发`);
        }
        break;
      case 'stop':
        if (window.confirm(`确定要终止测试任务 ${task.subject} 吗？`)) {
          alert(`终止测试任务 ${task.subject} 功能已触发`);
        }
        break;
      case 'delete':
        if (window.confirm(`确定要删除测试任务 ${task.subject} 吗？此操作不可恢复。`)) {
          alert(`删除测试任务 ${task.subject} 功能已触发`);
        }
        break;
      default:
        break;
    }
  };

  // 获取状态样式
  const getStatusStyle = (status: string) => {
    switch(status) {
      case '执行中':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case '待执行':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '已完成':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 关闭详情
  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  // 导出样本
  const handleExportSample = () => {
    alert('导出样本功能已触发');
  };

  // 生成测试报告
  const handleGenerateReport = () => {
    alert('生成测试报告功能已触发');
  };

  // 渲染标签列表，最多显示3个，超出显示数量
  const renderTags = (tags: string[]) => {
    if (tags.length <= 3) {
      return tags.map((tag, index) => (
        <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-1 mb-1">
          {tag}
        </span>
      ));
    } else {
      return (
        <>
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-1 mb-1">
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mb-1">
            +{tags.length - 3}个
          </span>
        </>
      );
    }
  };

  // 获取复检状态样式
  const getReviewStatusStyle = (status: string) => {
    switch(status) {
      case '待复检':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '已复检':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 获取复检结果样式
  const getReviewResultStyle = (result: string) => {
    switch(result) {
      case '正确':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '错误':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 处理工单操作
  const handleTicketOperation = (operation: string, ticketId: number) => {
    switch(operation) {
      case 'edit':
        alert(`修改工单 ${ticketId} 标签功能已触发`);
        break;
      case 'history':
        alert(`查看工单 ${ticketId} 修改记录功能已触发`);
        break;
      case 'review':
        alert(`复检工单 ${ticketId} 功能已触发`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">抽样测试</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">展示所有抽样测试任务，支撑任务管理</p>
      </div>

      {selectedTask ? (
        // 任务详情视图
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Typography variant="h5" className="font-bold text-gray-800 dark:text-white">{selectedTask.subject}</Typography>
                  <button 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={handleCloseDetail}
                  >
                    <i className="fa-solid fa-arrow-left mr-1"></i>返回列表
                  </button>
                </div>

                {/* 任务基础信息 */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                  <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">任务基础信息</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">任务状态</p>
                      <span className={getStatusStyle(selectedTask.status)}>
                        {selectedTask.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">创建人</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedTask.creator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">创建时间</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedTask.createTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">覆盖工单数</p>
                      <p className="text-sm text-gray-800 dark:text-white">{selectedTask.totalTickets}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">抽样规则</p>
                      <p className="text-sm text-gray-800 dark:text-white">按 10% 比例随机抽样</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">完成进度</p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${selectedTask.progress}%` }}></div>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-white mt-1">{selectedTask.progress}%</p>
                    </div>
                  </div>

                  {/* 统计信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">已复检工单数</p>
                      <p className="text-sm text-gray-800 dark:text-white">3 / {sampleTickets.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">复检正确率</p>
                      <p className="text-sm text-green-600 dark:text-green-400">75%</p>
                    </div>
                  </div>
                </div>

                {/* 统计分析 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* 复检结果统计 */}
                  <Card>
                    <CardContent className="p-4">
                      <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">复检结果统计</Typography>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={reviewResultData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {reviewResultData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
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

                  {/* 标签错误类型统计 */}
                  <Card>
                    <CardContent className="p-4">
                      <Typography variant="subtitle1" className="font-medium text-gray-800 dark:text-white mb-4">标签错误类型统计</Typography>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={errorTypeData}>
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
                            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 样本工单列表 */}
                <Card>
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">样本工单列表</Typography>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              序号
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              工单类型
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              问题描述
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              话题标签
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              主体标签
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              其他标签
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              复检状态
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              复检结果
                            </th>
                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {sampleTickets.map((ticket, index) => (
                            <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {index + 1}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {ticket.ticketType}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[150px] truncate" title={ticket.problemDescription}>
                                {ticket.problemDescription}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {renderTags(ticket.topicTags)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {renderTags(ticket.subjectTags)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {renderTags(ticket.otherTags)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={getReviewStatusStyle(ticket.reviewStatus)}>
                                  {ticket.reviewStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={getReviewResultStyle(ticket.reviewResult)}>
                                  {ticket.reviewResult || '-'}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                                  onClick={() => handleTicketOperation('edit', ticket.id)}
                                >
                                  修改
                                </button>
                                <button 
                                  className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mr-2"
                                  onClick={() => handleTicketOperation('history', ticket.id)}
                                >
                                  查看记录
                                </button>
                                <button 
                                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                                  onClick={() => handleTicketOperation('review', ticket.id)}
                                >
                                  复检
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
                            显示第 <span className="font-medium">1</span> 到 <span className="font-medium">{Math.min(pageSize, sampleTickets.length)}</span> 条，共 <span className="font-medium">{sampleTickets.length}</span> 条结果
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
                  </CardContent>
                </Card>

                {/* 操作按钮 */}
                <div className="flex justify-end space-x-4 mt-6">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                    onClick={handleExportSample}
                  >
                    <i className="fa-solid fa-file-export mr-2"></i>导出样本
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                    onClick={handleGenerateReport}
                  >
                    <i className="fa-solid fa-file-pdf mr-2"></i>生成测试报告
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      ) : (
        // 任务列表视图
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

                  {/* 抽样主题 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">抽样主题</label>
                    <input
                      type="text"
                      value={searchParams.subject}
                      onChange={(e) => handleParamChange('subject', e.target.value)}
                      placeholder="请输入抽样主题关键词"
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

                  {/* 任务状态 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">任务状态</label>
                    <div className="relative">
                      <select 
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                        value={searchParams.status}
                        onChange={(e) => handleParamChange('status', e.target.value)}
                      >
                        <option value="全部">全部</option>
                        <option value="待执行">待执行</option>
                        <option value="执行中">执行中</option>
                        <option value="已完成">已完成</option>
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

          {/* 任务列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          序号
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          抽样主题
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          任务状态
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          创建时间
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          创建人
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          覆盖工单数
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          完成进度
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((task, index) => (
                        <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[250px] truncate" title={task.subject}>
                            {task.subject}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={getStatusStyle(task.status)}>
                              {task.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {task.createTime}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {task.creator}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {task.totalTickets}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                                <div className={`h-2.5 rounded-full ${
                                  task.progress === 100 ? 'bg-green-600' : task.progress > 0 ? 'bg-blue-600' : 'bg-gray-400'
                                }`} style={{ width: `${task.progress}%` }}></div>
                              </div>
                              <span className="text-xs text-gray-700 dark:text-gray-300">{task.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                              onClick={() => handleTaskOperation('view', task)}
                            >
                              查看详情
                            </button>
                            {task.status === '待执行' && (
                              <button 
                                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-2"
                                onClick={() => handleTaskOperation('start', task)}
                              >
                                开始测试
                              </button>
                            )}
                            {task.status === '执行中' && (
                              <button 
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mr-2"
                                onClick={() => handleTaskOperation('stop', task)}
                              >
                                终止测试
                              </button>
                            )}
                            {task.status === '已完成' && (
                              <button 
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                onClick={() => handleTaskOperation('delete', task)}
                              >
                                删除
                              </button>
                            )}
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
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}