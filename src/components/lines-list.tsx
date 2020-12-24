import { FC, useEffect, useState } from 'react';
import { useLines } from '@/hooks';
import { Avatar, Input, List, message, Tag, Typography } from 'antd';
import { FixedSizeList as VList } from 'react-window';
import useResizeObserver from 'use-resize-observer';
import {
  getLineCode,
  getLineColour,
  getRouteSectionDesc,
  getServiceTypeColour,
} from '@/utils';
import './lines-list.less';

const { Text } = Typography;

const LinesList: FC = () => {
  const { lines, error, loading } = useLines();
  const { ref, width = 0, height = 0 } = useResizeObserver<HTMLDivElement>();
  const [selectedLineId, setSelectedLineId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredLines, setFilteredLines] = useState(lines);

  useEffect(() => {
    setFilteredLines(lines);
  }, [lines.length]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (searchValue) {
      setFilteredLines(
        lines.filter((line) =>
          line.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredLines(lines);
    }
  }, [searchValue]);

  const handleClick = (id: string) => {
    setSelectedLineId(id);
  };

  return (
    <>
      <Input
        className="lines-input"
        placeholder="Filter by line name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value || '')}
      />
      <div className="lines-list" ref={ref}>
        <List loading={loading}>
          <VList
            height={height}
            itemCount={filteredLines.length}
            itemSize={84}
            overscanCount={3}
            width={width}
          >
            {({ index, style }) => {
              const line = filteredLines[index];
              return (
                <div
                  className={
                    line.id === selectedLineId
                      ? 'seleted-line-item'
                      : 'line-item'
                  }
                  key={line.id}
                >
                  <List.Item onClick={() => handleClick(line.id)} style={style}>
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
                          <Text className="line-name" strong>
                            {`Line ${line.name}`}
                          </Text>
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
                </div>
              );
            }}
          </VList>
        </List>
      </div>
    </>
  );
};

export default LinesList;
