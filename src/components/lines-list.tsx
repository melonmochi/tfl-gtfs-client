/* eslint-disable react/destructuring-assignment */
import { FC, useEffect, useRef, useState } from 'react';
import { useLines } from '@/hooks';
import { Input, List, message } from 'antd';
import { FixedSizeList as VList } from 'react-window';
import './lines-list.less';

const LinesList: FC = () => {
  const { lines, error, loading } = useLines();
  const listRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (listRef.current) {
      setTimeout(() => {
        setSizes({
          width: listRef.current?.offsetWidth || 0,
          height: listRef.current?.offsetHeight || 0,
        });
      }, 0);
    }
  }, [listRef]);

  return (
    <>
      <Input className="lines-input" />
      <div className="lines-list" ref={listRef}>
        <List loading={loading} dataSource={lines}>
          <VList
            height={sizes.height}
            itemCount={lines.length}
            itemSize={32}
            overscanCount={3}
            width={sizes.width}
          >
            {({ index, style }) => {
              const line = lines[index];
              return (
                <List.Item key={line.id} style={style}>
                  {line.name}
                </List.Item>
              );
            }}
          </VList>
        </List>
      </div>
    </>
  );
};

export default LinesList;
