import { useState } from 'react';
import { Card, CardContent, Typography } from '@/components/ui/Card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

// 趋势数据
const trendData = [
  { date: '8月18日', count: 120 },
  { date: '8月19日', count: 180 },
  { date: '8月20日', count: 150 },
  { date: '8月21日', count: 200 },
  { date: '8月22日', count: 170 },
  { date: '8月23日', count: 230 },
  { date: '8月24日', count: 210 },
];

// 高频事件数据
const highFrequencyEvents = [
  { name: '城市管理问题', count: 285, trend: 'up' },
  { name: '环境卫生', count: 243, trend: 'up' },
  { name: '物业管理', count: 210, trend: 'down' },
  { name: '交通出行', count: 198, trend: 'up' },
  { name: '公共设施', count: 176, trend: 'down' },
  { name: '噪音污染', count: 154, trend: 'up' },
  { name: '市场监管', count: 132, trend: 'down' },
  { name: '教育资源', count: 110, trend: 'up' },
];

// 满意度数据
const satisfactionData = [
  { name: '旌阳区', rate: 92 },
  { name: '罗江区', rate: 88 },
  { name: '中江县', rate: 85 },
  { name: '广汉市', rate: 90 },
  { name: '什邡市', rate: 87 },
  { name: '绵竹市', rate: 89 },
];

// 工单类型分布
const ticketTypeData = [
  { name: '投诉类', value: 45 },
  { name: '咨询类', value: 25 },
  { name: '求助类', value: 20 },
  { name: '建议类', value: 8 },
  { name: '表扬类', value: 2 },
];

// 标签使用数据
const tagUsageData = [
  { subject: '话题标签', A: 80, fullMark: 100 },
  { subject: '地理标签', A: 90, fullMark: 100 },
  { subject: '主体标签', A: 75, fullMark: 100 },
  { subject: '时间标签', A: 60, fullMark: 100 },
  { subject: '拓展标签', A: 70, fullMark: 100 },
  { subject: '案件性质', A: 85, fullMark: 100 },
];

// 预警数据
const warningData = [
  { type: '超期预警', level: '一级', count: 15, status: '待处置' },
  { type: '不满意预警', level: '二级', count: 28, status: '待处置' },
  { type: '重复投诉预警', level: '三级', count: 45, status: '处置中' },
  { type: '一人多诉预警', level: '二级', count: 12, status: '待处置' },
  { type: '多人同诉预警', level: '一级', count: 8, status: '处置中' },
];

// 颜色配置
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Workbench() {
  const [selectedDateRange, setSelectedDateRange] = useState('近90天');
  const [selectedRegion, setSelectedRegion] = useState('市');

  // 数字卡片动画变量
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和筛选 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">全域诉求智慧研判工作台</h1>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select 
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </div>
          </div>
          
          <div className="relative">
            <select 
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="市">市</option>
              <option value="旌阳区">旌阳区</option>
              <option value="罗江区">罗江区</option>
              <option value="中江县">中江县</option>
              <option value="广汉市">广汉市</option>
              <option value="什邡市">什邡市</option>
              <option value="绵竹市">绵竹市</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </div>
          </div>
          
          <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
            <i className="fa-solid fa-rotate mr-2"></i>
            刷新数据
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 text-sm flex items-center">
            <i className="fa-solid fa-file-export mr-2"></i>
            导出全域报告
          </button>
        </div>
      </div>

      {/* 数据总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总工单数</p>
                  <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">12,753</Typography>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长 5.2%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <i className="fa-solid fa-ticket text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已办结工单</p>
                  <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">11,890</Typography>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 办结率 93.2%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-600/10 flex items-center justify-center text-green-600 dark:text-green-400">
                  <i className="fa-solid fa-check-circle text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">预警总数</p>
                  <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">136</Typography>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 较上周增长 8.3%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-none">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">市民满意度</p>
                  <Typography variant="h4" className="font-bold text-gray-800 dark:text-white">91.5%</Typography>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <i className="fa-solid fa-arrow-up mr-1"></i> 较上周提升 0.8%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <i className="fa-solid fa-star text-xl"></i>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 趋势分析卡片 */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">诉求趋势分析</Typography>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">近7天</button>
                  <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">近30天</button>
                  <button className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">近90天</button>
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
            </CardContent>
          </Card>
        </motion.div>
        
        {/* 工单类型分布 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">工单类型分布</Typography>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketTypeData.map((entry, index) => (
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
        </motion.div>
      </div>

      {/* 第二行图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 高频事件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">高频事件 TOP8</Typography>
                <button className="text-xs text-blue-600 dark:text-blue-400">查看全部</button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {highFrequencyEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]">{event.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 mr-2">{event.count}</span>
                      <span className={`text-xs flex items-center ${event.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                        <i className={`fa-solid ${event.trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                        {event.trend === 'up' ? '上升' : '下降'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* 标签使用情况 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">标签使用情况</Typography>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} width={400} height={250} data={tagUsageData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="使用覆盖率" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* 区域满意度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-4">区域满意度</Typography>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={satisfactionData}
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="name" width={60} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '满意度']}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderColor: '#e5e7eb',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                      {satisfactionData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.rate < 90 ? '#ef4444' : '#10b981'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 预警信息卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-bold text-gray-800 dark:text-white">最新预警信息</Typography>
              <button className="text-xs text-blue-600 dark:text-blue-400">查看全部预警</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">预警类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">预警级别</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">涉及工单</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {warningData.map((warning, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{warning.type}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          warning.level === '一级' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                          warning.level === '二级' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {warning.level}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{warning.count}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          warning.status === '待处置' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                          warning.status === '处置中' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        }`}>
                          {warning.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2">查看</button>
                        <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">处理</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}