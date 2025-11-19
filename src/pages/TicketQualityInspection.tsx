import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// 工单数据
const ticketData = [
  {
    id: 1,
    ticketNumber: '20231118001',
    cityTicketNumber: 'DS20231118001',
    description: '关于市区道路施工导致交通拥堵的投诉',
    topicTags: ['道路施工', '交通拥堵', '城市管理'],
    subjectTags: ['市住建局', '市交警支队'],
    geoTags: '旌阳区城北街道',
    otherTags: ['早高峰', '施工延误'],
    caseType: '投诉类',
    verificationStatus: '待核验'
  },
  {
    id: 2,
    ticketNumber: '20231118002',
    cityTicketNumber: 'DS20231118002',
    description: '咨询关于老年人医疗保险报销流程的问题',
    topicTags: ['医疗保险', '报销流程', '政策咨询'],
    subjectTags: ['市医保局'],
    geoTags: '罗江区万安镇',
    otherTags: ['老年人服务'],
    caseType: '咨询类',
    verificationStatus: '已通过'
  },
  {
    id: 3,
    ticketNumber: '20231118003',
    cityTicketNumber: 'DS20231118003',
    description: '建议在小区周边增设公共健身器材',
    topicTags: ['公共设施', '健身器材', '社区建设'],
    subjectTags: ['市体育局', '区住建局'],
    geoTags: '中江县凯江镇',
    otherTags: ['社区服务'],
    caseType: '建议类',
    verificationStatus: '已通过'
  },
  {
    id: 4,
    ticketNumber: '20231118004',
    cityTicketNumber: 'DS20231118004',
    description: '请求帮助解决小区停水问题',
    topicTags: ['供水问题', '居民生活', '紧急求助'],
    subjectTags: ['市自来水公司', '区住建局'],
    geoTags: '广汉市雒城镇',
    otherTags: ['紧急情况'],
    caseType: '求助类',
    verificationStatus: '不通过'
  },
  {
    id: 5,
    ticketNumber: '20231118005',
    cityTicketNumber: 'DS20231118005',
    description: '表扬社区工作人员热心服务',
    topicTags: ['社区服务', '表扬感谢', '工作人员'],
    subjectTags: ['区民政局'],
    geoTags: '什邡市方亭街道',
    otherTags: ['正面评价'],
    caseType: '表扬类',
    verificationStatus: '待核验'
  }
];

// 工单统计数据
const ticketStatsData = [
  { name: '待核验', value: 2, color: '#f59e0b' },
  { name: '已通过', value: 2, color: '#10b981' },
  { name: '不通过', value: 1, color: '#ef4444' }
];

export default function TicketQualityInspection() {
  const [searchParams, setSearchParams] = useState({
    reportDate: '近30天',
    caseType: [] as string[],
    ticketNumber: '',
    ticketNature: '全部',
    ticketDescription: '',
    addressDescription: '',
    cityTicketNumber: ''
  });
  
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(ticketData);
  const [isLoading, setIsLoading] = useState(false);

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

  // 处理案件类型选择
  const handleCaseTypeToggle = (type: string) => {
    setSearchParams(prev => {
      const currentTypes = [...prev.caseType];
      const index = currentTypes.indexOf(type);
      
      if (index > -1) {
        currentTypes.splice(index, 1);
      } else {
        currentTypes.push(type);
      }
      
      return { ...prev, caseType: currentTypes };
    });
    setCurrentPage(1);
  };

  // 重置搜索条件
  const resetSearch = () => {
    setSearchParams({
      reportDate: '近30天',
      caseType: [],
      ticketNumber: '',
      ticketNature: '全部',
      ticketDescription: '',
      addressDescription: '',
      cityTicketNumber: ''
    });
    setCurrentPage(1);
  };

  // 处理工单选择
  const handleTicketSelect = (id: number) => {
    setSelectedTickets(prev => {
      const index = prev.indexOf(id);
      
      if (index > -1) {
        return prev.filter(ticketId => ticketId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedTickets.length === filteredData.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredData.map(ticket => ticket.id));
    }
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

  // 根据核验状态返回不同的样式
  const getStatusStyle = (status: string) => {
    switch(status) {
      case '待核验':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '已通过':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '不通过':
        return 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // 导出数据
  const handleExport = () => {
    alert('导出功能已触发');
  };

  // 批量操作函数
  const handleBatchOperation = (operation: string) => {
    if (selectedTickets.length === 0) {
      alert('请先选择工单');
      return;
    }
    
    switch(operation) {
      case 'append':
        alert('批量追加标签功能已触发');
        break;
      case 'replace':
        alert('批量替换标签功能已触发');
        break;
      case 'verify':
        alert('批量核验功能已触发');
        break;
      case 'cancelVerify':
        alert('批量取消核验功能已触发');
        break;
      case 'delete':
        alert('批量删除标签功能已触发');
        break;
      default:
        break;
    }
  };

  // 单条操作函数
  const handleSingleOperation = (operation: string, id: number) => {
    switch(operation) {
      case 'edit':
        alert(`修改工单 ${id} 标签功能已触发`);
        break;
      case 'history':
        alert(`查看工单 ${id} 修改记录功能已触发`);
        break;
      case 'verify':
        alert(`核验工单 ${id} 功能已触发`);
        break;
      case 'auditHistory':
        alert(`查看工单 ${id} 审核记录功能已触发`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">工单标签质检</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">通过多维度条件精准查询工单标签质检情况，支撑标签质量核查</p>
      </div>

      {/* 搜索条件卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 上报时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">上报时间</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={searchParams.reportDate}
                    onChange={(e) => handleParamChange('reportDate', e.target.value)}
                  ><option value="今天">今天</option>
                    <option value="本周">本周</option>
                    <option value="本月">本月</option>
                    <option value="本季度">本季度</option>
                    <option value="本年">本年</option>
                    <option value="近30天">近30天</option>
                    <option value="自定义">自定义</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 案件类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">案件类型</label>
                <div className="flex flex-wrap gap-2">
                  {['投诉类', '咨询类', '建议类', '求助类', '表扬类'].map((type) => (
                    <label key={type} className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={searchParams.caseType.includes(type)}
                        onChange={() => handleCaseTypeToggle(type)}
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 工单编号 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">工单编号</label>
                <input
                  type="text"
                  value={searchParams.ticketNumber}
                  onChange={(e) => handleParamChange('ticketNumber', e.target.value)}
                  placeholder="请输入工单编号"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  maxLength={20}
                />
              </div>

              {/* 工单性质 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">工单性质</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={searchParams.ticketNature}
                    onChange={(e) => handleParamChange('ticketNature', e.target.value)}
                  >
                    <option value="全部">全部</option>
                    <option value="民生类">民生类</option>
                    <option value="政务类">政务类</option>
                    <option value="企业类">企业类</option>
                    <option value="其他类">其他类</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 工单描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">工单描述</label>
                <input
                  type="text"
                  value={searchParams.ticketDescription}
                  onChange={(e) => handleParamChange('ticketDescription', e.target.value)}
                  placeholder="请输入工单描述关键词"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  maxLength={50}
                />
              </div>

              {/* 地址描述 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">地址描述</label>
                <input
                  type="text"
                  value={searchParams.addressDescription}
                  onChange={(e) => handleParamChange('addressDescription', e.target.value)}
                  placeholder="请输入地址关键词"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  maxLength={100}
                />
              </div>

              {/* 市工单编号 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">市工单编号</label>
                <input
                  type="text"
                  value={searchParams.cityTicketNumber}
                  onChange={(e) => handleParamChange('cityTicketNumber', e.target.value)}
                  placeholder="请输入市工单编号"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  maxLength={25}
                />
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-6 flex justify-center">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                onClick={() => console.log('搜索')}
              >
                <i className="fa-solid fa-search mr-2"></i>查询
              </button>
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                onClick={resetSearch}
              >
                <i className="fa-solid fa-rotate-left mr-2"></i>重置
              </button>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                onClick={handleExport}
              >
                <i className="fa-solid fa-file-export mr-2"></i>导出
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-3"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">当前查询结果</p>
                  <div className="mt-1 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">总工单</span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">{filteredData.length}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mr-2">待核验</span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">{ticketStatsData.find(item => item.name === '待核验')?.value || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-2">已通过</span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">{ticketStatsData.find(item => item.name === '已通过')?.value || 0}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">不通过</span>
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">{ticketStatsData.find(item => item.name === '不通过')?.value || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketStatsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {ticketStatsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value}件`, name]}
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
            </CardContent>
          </Card>
        </motion.div>
        
        {/* 批量操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">批量操作</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="text-xs py-1 px-2 border border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                  onClick={() => handleBatchOperation('append')}
                  disabled={selectedTickets.length === 0}
                >
                  <i className="fa-solid fa-plus mr-1"></i>追加标签
                </button>
                <button 
                  className="text-xs py-1 px-2 border border-green-500 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center"
                  onClick={() => handleBatchOperation('replace')}
                  disabled={selectedTickets.length === 0}
                >
                  <i className="fa-solid fa-arrow-right-arrow-left mr-1"></i>替换标签
                </button>
                <button 
                  className="text-xs py-1 px-2 border border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors flex items-center justify-center"
                  onClick={() => handleBatchOperation('verify')}
                  disabled={selectedTickets.length === 0}
                >
                  <i className="fa-solid fa-check-double mr-1"></i>批量核验
                </button>
                <button 
                  className="text-xs py-1 px-2 border border-gray-500 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                  onClick={() => handleBatchOperation('cancelVerify')}
                  disabled={selectedTickets.length === 0}
                >
                  <i className="fa-solid fa-undo mr-1"></i>取消核验
                </button>
                <button 
                  className="text-xs py-1 px-2 border border-red-500 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center col-span-2"
                  onClick={() => handleBatchOperation('delete')}
                  disabled={selectedTickets.length === 0}
                >
                  <i className="fa-solid fa-trash-can mr-1"></i>删除标签
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 工单列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-0">
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
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                          <input
                            type="checkbox"
                            checked={selectedTickets.length > 0 && selectedTickets.length === filteredData.length}
                            onChange={handleSelectAll}
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          工单编号
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          市工单编号
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          工单描述
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          话题标签
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          主体标签
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          地理标签
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          其他标签
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          案件性质
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          核验状态
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedTickets.includes(ticket.id)}
                              onChange={() => handleTicketSelect(ticket.id)}
                              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                            {ticket.ticketNumber}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {ticket.cityTicketNumber || '无'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[150px] truncate" title={ticket.description}>
                            {ticket.description}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {renderTags(ticket.topicTags)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {renderTags(ticket.subjectTags)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            {ticket.geoTags || '未标注'}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {renderTags(ticket.otherTags)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {ticket.caseType}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={getStatusStyle(ticket.verificationStatus)}>
                              {ticket.verificationStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                              onClick={() => handleSingleOperation('edit', ticket.id)}
                            >
                              修改
                            </button>
                            <button 
                              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mr-2"
                              onClick={() => handleSingleOperation('history', ticket.id)}
                            >
                              修改记录
                            </button>
                            <button 
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-2"
                              onClick={() => handleSingleOperation('verify', ticket.id)}
                            >
                              核验
                            </button>
                            <button 
                              className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                              onClick={() => handleSingleOperation('auditHistory', ticket.id)}
                            >
                              审核记录
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
    </div>
  );
}