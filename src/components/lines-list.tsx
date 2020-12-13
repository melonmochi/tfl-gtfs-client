/* eslint-disable react/destructuring-assignment */
import { FC, useEffect, useRef, useState } from 'react';
import { useLines } from '@/hooks';
import { Avatar, Input, List, message, Tag, Typography } from 'antd';
import { FixedSizeList as VList } from 'react-window';
import {
  getLineCode,
  getLineColour,
  getRouteSectionDesc,
  getServiceTypeColour,
} from '@/utils';
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
            itemSize={84}
            overscanCount={3}
            width={sizes.width}
          >
            {({ index, style }) => {
              const line = lines[index];
              return (
                <List.Item key={line.id} style={style}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        style={{
                          backgroundColor: getLineColour(line.modeName),
                        }}
                      >
                        {getLineCode(line.id)}
                      </Avatar>
                    }
                    className="item-meta"
                    title={
                      <>
                        <a className="line-name" href="https://api.tfl.gov.uk/">
                          {`Line ${line.name}`}
                        </a>
                        {line.serviceTypes.map((type) => (
                          <Tag
                            className="service-type-tag"
                            color={getServiceTypeColour(type.name)}
                            key={type.uri}
                          >
                            {type.name[0]}
                          </Tag>
                        ))}
                      </>
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{ marginBottom: 0 }}
                      >
                        {getRouteSectionDesc(line.routeSections)}
                      </Typography.Paragraph>
                    }
                  />
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
