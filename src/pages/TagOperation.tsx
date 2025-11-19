import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// 标签分类数据
const tagCategories = [
  { id: 1, name: '话题标签', totalCount: 1067, tagCount: 3280, children: [
    { id: 101, name: '城市管理', count: 580 },
    { id: 102, name: '交通出行', count: 450 },
    { id: 103, name: '环境保护', count: 320 },
    { id: 104, name: '公共设施', count: 290 },
    { id: 105, name: '社区服务', count: 260 }
  ]},
  { id: 2, name: '地理标签', totalCount: 890, tagCount: 2850, children: [
    { id: 201, name: '旌阳区', count: 680 },
    { id: 202, name: '罗江区', count: 520 },
    { id: 203, name: '中江县', count: 490 },
    { id: 204, name: '广汉市', count: 460 },
    { id: 205, name: '什邡市', count: 380 },
    { id: 206, name: '绵竹市', count: 320 }
  ]},
  { id: 3, name: '主体标签', totalCount: 650, tagCount: 2100, children: [
    { id: 301, name: '市住建局', count: 380 },
    { id: 302, name: '市公安局', count: 320 },
    { id: 303, name: '市交通局', count: 290 },
    { id: 304, name: '市环保局', count: 260 },
    { id: 305, name: '市卫健委', count: 240 }
  ]},
  { id: 4, name: '时间标签', totalCount: 420, tagCount: 1850, children: [
    { id: 401, name: '工作日', count: 650 },
    { id: 402, name: '节假日', count: 480 },
    { id: 403, name: '早高峰', count: 380 },
    { id: 404, name: '夜间', count: 340 }
  ]},
  { id: 5, name: '拓展标签', totalCount: 380, tagCount: 1620, children: [
    { id: 501, name: '紧急情况', count: 420 },
    { id: 502, name: '重复投诉', count: 380 },
    { id: 503, name: '老年人服务', count: 320 },
    { id: 504, name: '正面评价', count: 260 },
    { id: 505, name: '负面评价', count: 240 }
  ]}
];

// 打标方式数据
const taggingMethodData = [
  { name: '模型算法打标', value: 45, count: 4860 },
  { name: '规则算法打标', value: 30, count: 3240 },
  { name: '人工打标', value: 25, count: 2700 }
];

// 标签变更数据
const tagChangeData = [
  { name: '新增标签', value: 120 },
  { name: '编辑标签', value: 85 },
  { name: '删除标签', value: 45 }
];

// 标签统计趋势数据
const tagTrendData = [
  { month: '6月', 模型算法打标: 1200, 规则算法打标: 850, 人工打标: 700 },
  { month: '7月', 模型算法打标: 1350, 规则算法打标: 900, 人工打标: 720 },
  { month: '8月', 模型算法打标: 1500, 规则算法打标: 950, 人工打标: 680 },
  { month: '9月', 模型算法打标: 1300, 规则算法打标: 920, 人工打标: 750 },
  { month: '10月', 模型算法打标: 1450, 规则算法打标: 980, 人工打标: 780 },
  { month: '11月', 模型算法打标: 1600, 规则算法打标: 1020, 人工打标: 820 },
];

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function TagOperation() {
  const [selectedDateRange, setSelectedDateRange] = useState('近90天');
  const [selectedCategory, setSelectedCategory] = useState('所有分类');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [selectedDateRange, selectedCategory]);

  // 处理分类展开/收起
  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // 处理标签选择
  const handleTagSelect = (tag: any) => {
    setSelectedTag(tag);
  };

  // 处理分类筛选
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setExpandedCategories([]); // 重置展开状态
    setSelectedTag(null); // 重置选中标签
  };

  // 刷新数据
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // 导出统计
  const handleExport = () => {
    alert('导出统计数据功能已触发');
  };

  // 过滤标签分类
  const filteredCategories = selectedCategory === '所有分类' 
    ? tagCategories 
    : tagCategories.filter(category => category.name === selectedCategory);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">标签运营</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">展示全量标签分类树及相关统计信息，支撑标签运营分析</p>
      </div>

      {/* 搜索条件卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 统计时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">统计时间</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                  >
                    <option value="近7天">近7天</option>
                    <option value="近30天">近30天</option>
                    <option value="近90天">近90天</option>
                    <option value="近180天">近180天</option>
                    <option value="近365天">近365天</option>
                    <option value="自定义">自定义</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 标签分类 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签分类</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryFilter(e.target.value)}
                  >
                    <option value="所有分类">所有分类</option>
                    {tagCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-end">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>刷新中
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-rotate mr-2"></i>刷新
                    </>
                  )}
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                  onClick={handleExport}
                >
                  <i className="fa-solid fa-file-export mr-2"></i>导出统计
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 标签统计信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 标签变更情况 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">标签变更情况</Typography>
              <div className="grid grid-cols-3 gap-4">
                {tagChangeData.map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.name}</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{item.value}</p>
                    <p className={`text-xs mt-1 ${index === 0 ? 'text-green-600 dark:text-green-400' : index === 1 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                      {index === 0 ? '较上月 +12%' : index === 1 ? '较上月 +8%' : '较上月 -5%'}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">查看变更详情</button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 工单打标数统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">工单打标数统计</Typography>
              <div className="flex items-center">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={taggingMethodData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {taggingMethodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => [`${props.payload.count}件 (${value}%)`, name]}
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
                  {taggingMethodData.map((item, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.name}</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item.count}件 ({item.value}%)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 打标趋势 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">打标趋势分析</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={tagTrendData}
                  margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="模型算法打标" fill="#0088FE" barSize={15} />
                  <Bar dataKey="规则算法打标" fill="#00C49F" barSize={15} />
                  <Bar dataKey="人工打标" fill="#FFBB28" barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 标签分类树和详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 标签分类树 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-0 h-[500px] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">标签分类树</Typography>
              </div>
              {isLoading ? (
                <div className="flex flex-1 justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="p-4 overflow-y-auto flex-1">
                  {filteredCategories.map(category => (
                    <div key={category.id} className="mb-3">
                      <div 
                        className="flex items-center justify-between cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center">
                          <i className={`fa-solid fa-chevron-down mr-2 text-xs transition-transform duration-200 ${expandedCategories.includes(category.id) ? 'transform rotate-180' : ''}`}></i>
                          <span className="font-medium text-gray-800 dark:text-white">{category.name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">({category.totalCount}-{category.tagCount})</span>
                      </div>
                      
                      {expandedCategories.includes(category.id) && (
                        <div className="ml-6 mt-2 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                          {category.children.map(child => (
                            <div 
                              key={child.id}
                              className={`p-2 rounded-md cursor-pointer mb-1 transition-colors ${selectedTag?.id === child.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                              onClick={() => handleTagSelect(child)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{child.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">-{child.count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 标签信息详情 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-0 h-[500px] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  {selectedTag ? `${selectedTag.name} - 标签详情` : '标签详情'}
                </Typography>
                {selectedTag && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <i className="fa-solid fa-pen-to-square mr-1"></i>编辑
                  </button>
                )}
              </div>
              
              {selectedTag ? (
                <div className="p-6 overflow-y-auto flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 基本信息区 */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">基本信息</Typography>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">标签编号</p>
                          <p className="text-sm text-gray-800 dark:text-white">TAG-{selectedTag.id.toString().padStart(6, '0')}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">标签名称</p>
                          <p className="text-sm text-gray-800 dark:text-white">{selectedTag.name}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">所属分类</p>
                          <p className="text-sm text-gray-800 dark:text-white">
                            {tagCategories.find(cat => cat.children.some(child => child.id === selectedTag.id))?.name || '未知'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">创建人</p>
                          <p className="text-sm text-gray-800 dark:text-white">系统管理员</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">创建时间</p>
                          <p className="text-sm text-gray-800 dark:text-white">2023-06-15 09:30:00</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">更新人</p>
                          <p className="text-sm text-gray-800 dark:text-white">运营管理员</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">更新时间</p>
                          <p className="text-sm text-gray-800 dark:text-white">2023-11-10 14:20:00</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 扩展信息区 */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">扩展信息</Typography>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">标签状态</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            启用
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">标签分值</p>
                          <div className="flex items-center mt-1">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-800 dark:text-white">8.0</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">是否常用</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            是
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">公开部门</p>
                          <p className="text-sm text-gray-800 dark:text-white">全部可见</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">标签说明</p>
                          <p className="text-sm text-gray-800 dark:text-white">该标签用于标记与{selectedTag.name}相关的工单内容。</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">累计打标数</p>
                          <p className="text-sm text-gray-800 dark:text-white">{selectedTag.count}次</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 关联信息区 */}
                  <div className="mt-6">
                    <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">关联标签</Typography>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        相关问题1
                        <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        相关问题2
                        <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        相关问题3
                        <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                      </span>
                    </div>
                  </div>
                  
                  {/* 修改记录区 */}
                  <div className="mt-6">
                    <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-3">修改记录</Typography>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">序号</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">修改人</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">所属部门</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">修改时间</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">修改字段</th>
                            <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">修改内容</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">1</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">运营管理员</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">信息中心</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">2023-11-10 14:20:00</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">标签分值</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="text-red-500 dark:text-red-400">7.5</span> → <span className="text-green-500 dark:text-green-400">8.0</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">2</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">系统管理员</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">信息中心</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">2023-09-05 10:15:00</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">标签说明</td>
                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                              <span className="text-red-500 dark:text-red-400">原说明</span> → <span className="text-green-500 dark:text-green-400">该标签用于标记与{selectedTag.name}相关的工单内容。</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-1 justify-center items-center">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 mb-4">
                      <i className="fa-solid fa-tags text-2xl"></i>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">请从左侧标签树中选择一个标签查看详情</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}