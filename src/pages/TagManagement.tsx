import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 通用标签数据
const tagData = [
  {
    id: 1,
    name: '城市管理问题',
    category: '话题标签',
    isCommon: true,
    updateTime: '2023-11-18 10:30:00',
    description: '用于标记与城市管理相关的问题工单'
  },
  {
    id: 2,
    name: '环境卫生',
    category: '话题标签',
    isCommon: true,
    updateTime: '2023-11-17 14:20:00',
    description: '用于标记与环境卫生相关的问题工单'
  },
  {
    id: 3,
    name: '物业管理',
    category: '话题标签',
    isCommon: true,
    updateTime: '2023-11-16 09:15:00',
    description: '用于标记与物业管理相关的问题工单'
  },
  {
    id: 4,
    name: '交通出行',
    category: '话题标签',
    isCommon: true,
    updateTime: '2023-11-15 16:45:00',
    description: '用于标记与交通出行相关的问题工单'
  },
  {
    id: 5,
    name: '公共设施',
    category: '话题标签',
    isCommon: true,
    updateTime: '2023-11-14 11:25:00',
    description: '用于标记与公共设施相关的问题工单'
  },
  {
    id: 6,
    name: '旌阳区',
    category: '地理标签',
    isCommon: true,
    updateTime: '2023-11-13 15:50:00',
    description: '用于标记旌阳区相关的工单'
  },
  {
    id: 7,
    name: '罗江区',
    category: '地理标签',
    isCommon: true,
    updateTime: '2023-11-12 10:10:00',
    description: '用于标记罗江区相关的工单'
  },
  {
    id: 8,
    name: '市住建局',
    category: '主体标签',
    isCommon: true,
    updateTime: '2023-11-11 13:30:00',
    description: '用于标记市住建局相关的工单'
  },
  {
    id: 9,
    name: '市公安局',
    category: '主体标签',
    isCommon: true,
    updateTime: '2023-11-10 09:05:00',
    description: '用于标记市公安局相关的工单'
  },
  {
    id: 10,
    name: '早高峰',
    category: '时间标签',
    isCommon: false,
    updateTime: '2023-11-09 14:40:00',
    description: '用于标记早高峰时段的工单'
  }
];

// 标签使用趋势数据
const tagTrendData = [
  { month: '6月', count: 120 },
  { month: '7月', count: 145 },
  { month: '8月', count: 168 },
  { month: '9月', count: 156 },
  { month: '10月', count: 178 },
  { month: '11月', count: 195 },
];

export default function TagManagement() {
  const [searchParams, setSearchParams] = useState({
    updateDate: '近30天',
    tagName: '',
    tagCategory: '所有分类',
    isCommon: '全部'
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(tagData);
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

  // 重置搜索条件
  const resetSearch = () => {
    setSearchParams({
      updateDate: '近30天',
      tagName: '',
      tagCategory: '所有分类',
      isCommon: '全部'
    });
    setCurrentPage(1);
  };

  // 处理标签操作
  const handleTagOperation = (operation: string, id: number) => {
    switch(operation) {
      case 'view':
        alert(`查看标签 ${id} 详情功能已触发`);
        break;
      case 'edit':
        alert(`编辑标签 ${id} 功能已触发`);
        break;
      case 'delete':
        if (window.confirm('确定要删除该标签吗？')) {
          alert(`删除标签 ${id} 功能已触发`);
        }
        break;
      case 'viewTickets':
        alert(`查看标签 ${id} 关联工单功能已触发`);
        break;
      default:
        break;
    }
  };

  // 新增标签
  const handleAddTag = () => {
    alert('新增标签功能已触发');
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">标签管理</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">展示通用标签核心信息，支撑标签基础管理</p>
      </div>

      {/* 统计信息卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  <i className="fa-solid fa-tags text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">标签总数</p><p className="text-2xl font-bold text-gray-800 dark:text-white">1,256</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                  <i className="fa-solid fa-star text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">常用标签</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">328</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                  <i className="fa-solid fa-chart-line text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">标签增长率</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">+8.3%</p>
                </div>
              </div>
            </div>
            
            {/* 标签使用趋势图 */}
            <div className="mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">标签使用趋势（近6个月）</p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tagTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6, fill: '#8884d8', strokeWidth: 2, stroke: '#fff' }}
                      name="标签使用量"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 搜索条件卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 更新时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">更新时间</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={searchParams.updateDate}
                    onChange={(e) => handleParamChange('updateDate', e.target.value)}
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

              {/* 标签名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签名称</label>
                <input
                  type="text"
                  value={searchParams.tagName}
                  onChange={(e) => handleParamChange('tagName', e.target.value)}
                  placeholder="请输入标签名称关键词"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              {/* 标签分类 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签分类</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={searchParams.tagCategory}
                    onChange={(e) => handleParamChange('tagCategory', e.target.value)}
                  >
                    <option value="所有分类">所有分类</option>
                    <option value="话题标签">话题标签</option>
                    <option value="地理标签">地理标签</option>
                    <option value="主体标签">主体标签</option>
                    <option value="时间标签">时间标签</option>
                    <option value="拓展标签">拓展标签</option>
                    <option value="案件性质">案件性质</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 是否常用 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">是否常用</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={searchParams.isCommon}
                    onChange={(e) => handleParamChange('isCommon', e.target.value)}
                  >
                    <option value="全部">全部</option>
                    <option value="是">是</option>
                    <option value="否">否</option>
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

      {/* 标签列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            {/* 列表头部 */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">通用标签列表</Typography>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                onClick={handleAddTag}
              >
                <i className="fa-solid fa-plus mr-2"></i>申请新标签
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
                          标签名称
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          标签分类
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          是否常用
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          更新时间
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          标签说明
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredData.map((tag, index) => (
                        <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                            {tag.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {tag.category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              tag.isCommon ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                              {tag.isCommon ? '是' : '否'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                            {tag.updateTime}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 max-w-[200px] truncate" title={tag.description}>
                            {tag.description}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2"
                              onClick={() => handleTagOperation('view', tag.id)}
                            >
                              查看
                            </button>
                            <button 
                              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mr-2"
                              onClick={() => handleTagOperation('edit', tag.id)}
                            >
                              编辑
                            </button>
                            <button 
                              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 mr-2"
                              onClick={() => handleTagOperation('delete', tag.id)}
                            >
                              删除
                            </button>
                            <button 
                              className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                              onClick={() => handleTagOperation('viewTickets', tag.id)}
                            >
                              关联工单
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