import type { FC } from 'react';
import { useCallback, useRef, useState } from 'react';

// 定义列表项的数据类型
interface ListItem {
  id: string;
  content: string;
}

interface VirtualListProps {
  // 所有列表项数据
  items: ListItem[];
  // 每项高度（像素）
  itemHeight: number;
  // 可视区域高度（像素）
  viewportHeight: number;
  // 额外渲染的项目数量（用于优化滚动体验）
  overscan?: number;
}

export const VirtualList: FC<VirtualListProps> = ({ items, itemHeight, viewportHeight, overscan = 5 }) => {
  // 滚动容器的引用
  const containerRef = useRef<HTMLDivElement>(null);
  // 滚动位置（像素）
  const [scrollTop, setScrollTop] = useState(0);

  // 计算总高度
  const totalHeight = items.length * itemHeight;

  // 计算可视区域内的项目范围
  const getVisibleRange = useCallback(() => {
    // 可视区域开始的索引
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    // 可视区域结束的索引
    const visibleCount = Math.ceil(viewportHeight / itemHeight);
    const endIndex = Math.min(items.length - 1, startIndex + visibleCount + overscan * 2);

    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, viewportHeight, items.length, overscan]);

  // 处理滚动事件
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // 获取可视区域内的项目
  const { startIndex, endIndex } = getVisibleRange();
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // 计算偏移量（用于定位可视项目）
  const offsetTop = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: `${viewportHeight}px`,
        overflow: 'auto',
        position: 'relative',
        border: '1px solid #e0e0e0'
      }}
      onScroll={handleScroll}
    >
      {/* 占位元素，用于撑起滚动高度 */}
      <div style={{ height: `${totalHeight}px` }} />

      {/* 可视区域内的项目 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${offsetTop}px)`
        }}
      >
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              height: `${itemHeight}px`,
              padding: '8px 16px',
              borderBottom: '1px solid #f0f0f0',
              boxSizing: 'border-box'
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
