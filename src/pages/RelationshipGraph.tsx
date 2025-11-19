import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Empty } from '@/components/Empty';

// 热点话题数据
const hotTopicsData = [
  { id: 1, name: '城市管理问题', demandCount: 285, relatedSubjectCount: 12 },
  { id: 2, name: '环境卫生', demandCount: 243, relatedSubjectCount: 10 },
  { id: 3, name: '物业管理', demandCount: 210, relatedSubjectCount: 8 },
  { id: 4, name: '交通出行', demandCount: 198, relatedSubjectCount: 15 },
  { id: 5, name: '公共设施', demandCount: 176, relatedSubjectCount: 9 },
  { id: 6, name: '噪音污染', demandCount: 154, relatedSubjectCount: 7 },
  { id: 7, name: '市场监管', demandCount: 132, relatedSubjectCount: 6 },
  { id: 8, name: '教育资源', demandCount: 110, relatedSubjectCount: 5 },
  { id: 9, name: '医疗服务', demandCount: 98, relatedSubjectCount: 8 },
  { id: 10, name: '社会保障', demandCount: 86, relatedSubjectCount: 7 }
];

// 热点主体数据
const hotSubjectsData = [
  { id: 1, name: '市住建局', demandCount: 420, relatedTopicCount: 18, type: '政府' },
  { id: 2, name: '市公安局', demandCount: 380, relatedTopicCount: 20, type: '政府' },
  { id: 3, name: '市交通局', demandCount: 320, relatedTopicCount: 15, type: '政府' },
  { id: 4, name: '市环保局', demandCount: 280, relatedTopicCount: 12, type: '政府' },
  { id: 5, name: '市教育局', demandCount: 250, relatedTopicCount: 10, type: '政府' },
  { id: 6, name: '市卫健委', demandCount: 220, relatedTopicCount: 14, type: '政府' },
  { id: 7, name: '市市场监管局', demandCount: 200, relatedTopicCount: 16, type: '政府' },
  { id: 8, name: '某物业公司', demandCount: 180, relatedTopicCount: 8, type: '企业' },
  { id: 9, name: '某公交公司', demandCount: 160, relatedTopicCount: 6, type: '企业' },
  { id: 10, name: '某供水公司', demandCount: 140, relatedTopicCount: 5, type: '企业' }
];

export default function RelationshipGraph() {
  const [activeTab, setActiveTab] = useState<'topics' | 'subjects'>('topics');
  const [selectedMonth, setSelectedMonth] = useState('2023-11');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGraphLoading, setIsGraphLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [activeTab, selectedMonth, searchKeyword]);

  // 模拟图谱加载
  useEffect(() => {
    setIsGraphLoading(true);
    setTimeout(() => {
      setIsGraphLoading(false);
    }, 1500);
  }, [activeTab, selectedItem]);

  // 过滤数据
  const filteredData = activeTab === 'topics' 
    ? hotTopicsData.filter(topic => topic.name.includes(searchKeyword))
    : hotSubjectsData.filter(subject => subject.name.includes(searchKeyword));

  // 导出图谱
  const handleExportGraph = () => {
    alert('导出图谱功能已触发');
  };

  // 导出数据
  const handleExportData = () => {
    alert('导出数据功能已触发');
  };

  // 渲染图谱（模拟实现）
  const renderGraph = () => {
    if (isGraphLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">图谱加载中...</p>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800/50">
        {/* 模拟图谱节点和连线 */}
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* 模拟节点 - 实际项目中应使用专门的图谱库如 d3.js 或 recharts 的关系图 */}
          <circle cx="20%" cy="30%" r="30" fill="#3b82f6" opacity="0.8" />
          <circle cx="50%" cy="50%" r="40" fill="#ef4444" opacity="0.8" />
          <circle cx="80%" cy="40%" r="25" fill="#10b981" opacity="0.8" />
          <circle cx="30%" cy="70%" r="20" fill="#8b5cf6" opacity="0.8" />
          <circle cx="70%" cy="70%" r="22" fill="#f59e0b" opacity="0.8" />
          
          {/* 模拟连线 */}
          <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#6b7280" strokeWidth="3" opacity="0.6" />
          <line x1="50%" y1="50%" x2="80%" y2="40%" stroke="#6b7280" strokeWidth="4" opacity="0.6" />
          <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="#6b7280" strokeWidth="2" opacity="0.6" />
          <line x1="50%" y1="50%" x2="70%" y2="70%" stroke="#6b7280" strokeWidth="2.5" opacity="0.6" />
          <line x1="20%" y1="30%" x2="30%" y2="70%" stroke="#6b7280" strokeWidth="1.5" opacity="0.6" />
          <line x1="80%" y1="40%" x2="70%" y2="70%" stroke="#6b7280" strokeWidth="1.8" opacity="0.6" />
        </svg>
        
        {/* 模拟节点标签 */}
        <div className="absolute top-[26%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800 dark:text-gray-200">
          城市管理
        </div>
        <div className="absolute top-[46%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800 dark:text-gray-200">
          市住建局
        </div>
        <div className="absolute top-[36%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800 dark:text-gray-200">
          交通出行
        </div>
        <div className="absolute top-[66%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800 dark:text-gray-200">
          市公安局
        </div>
        <div className="absolute top-[66%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm text-xs font-medium text-gray-800 dark:text-gray-200">
          物业管理
        </div>
        
        {/* 交互提示 */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm text-xs text-gray-500 dark:text-gray-400">
          <i className="fa-solid fa-mouse-pointer mr-1"></i> 点击节点查看详情 | <i className="fa-solid fa-arrows mr-1"></i> 拖动平移 | <i className="fa-solid fa-search-plus mr-1"></i> 滚轮缩放
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">关系图谱</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">查看热点话题排行及关联关系，支撑话题趋势分析</p>
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
              activeTab === 'topics' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('topics')}
          >
            热点话题
          </button>
          <button
            className={`py-3 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'subjects' 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('subjects')}
          >
            热点主体
          </button>
        </div>
      </motion.div>

      {/* 搜索条件卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 统计月份 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">统计月份</label>
                <div className="relative">
                  <select 
                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = 12 - i;
                      const year = month > new Date().getMonth() + 1 ? 2022 : 2023;
                      const monthStr = month.toString().padStart(2, '0');
                      return `${year}-${monthStr}`;
                    }).map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              {/* 搜索关键词 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {activeTab === 'topics' ? '话题名称' : '责任主体名称'}
                </label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder={`请输入${activeTab === 'topics' ? '话题' : '责任主体'}名称关键词`}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex items-end">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                  onClick={handleExportGraph}
                >
                  <i className="fa-solid fa-download mr-2"></i>导出图谱
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
                  onClick={handleExportData}
                >
                  <i className="fa-solid fa-file-export mr-2"></i>导出数据
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 列表和图谱区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 列表区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-0 h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  {activeTab === 'topics' ? '热点话题排行' : '热点主体排行'} TOP10
                </Typography>
              </div>
              {isLoading ? (
                <div className="flex flex-1 justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredData.length === 0 ? (
                <Empty />
              ) : (
                <div className="p-4 overflow-y-auto flex-1">
                  <div className="space-y-3">
                    {filteredData.map((item, index) => (
                      <div 
                        key={item.id}
                        className={`p-3 rounded-md border transition-all duration-200 cursor-pointer ${
                          selectedItem?.id === item.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-700' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/70'
                        }`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">
                                  诉求数: <span className="font-medium text-gray-700 dark:text-gray-300">{item.demandCount}</span>
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {activeTab === 'topics' ? '关联主体数' : '关联话题数'}: 
                                  <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {activeTab === 'topics' ? item.relatedSubjectCount : item.relatedTopicCount}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4">
                            {activeTab === 'subjects' && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                item.type === '政府' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {item.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 图谱可视化区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-0 h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">
                  {activeTab === 'topics' ? '话题关系图谱' : '主体关系图谱'}
                </Typography>
              </div>
              <div className="p-4 flex-1">
                {renderGraph()}
              </div>
              
              {/* 选中项详情 */}
              {selectedItem && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle1" className="font-bold text-gray-800 dark:text-white">
                      {selectedItem.name} - 详情
                    </Typography>
                    <button 
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => setSelectedItem(null)}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">诉求数</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">{selectedItem.demandCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activeTab === 'topics' ? '关联主体数' : '关联话题数'}
                      </p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {activeTab === 'topics' ? selectedItem.relatedSubjectCount : selectedItem.relatedTopicCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">环比变化</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        <i className="fa-solid fa-arrow-up mr-1"></i>+12.5%
                      </p>
                    </div>
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