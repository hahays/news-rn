import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {formatDate} from '../utils/format';
import type {Article} from '../types/news';

const Card = styled.View`
  background-color: ${({theme}) => theme.colors.card};
  border-radius: ${({theme}) => theme.radius.lg}px;
  overflow: hidden;
  margin: ${({theme}) => theme.spacing(1)}px 0;
  border: 1px solid ${({theme}) => theme.colors.divider};
`;

const Row = styled.View`
  padding: ${({theme}) => theme.spacing(1.5)}px;
  gap: 4px;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 16px;
  font-weight: 700;
`;

const Meta = styled.Text`
  color: ${({theme}) => theme.colors.subtext};
  font-size: 12px;
`;

const Cover = styled.Image`
  width: 100%;
  height: 200px;
  background-color: #0f172a;
`;

type Props = {article: Article; onPress?: () => void};

export const ArticleCard: React.FC<Props> = ({article, onPress}) => {
  const [broken, setBroken] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <Cover
          source={
            broken || !article.urlToImage
              ? require('../../assets/placeholder.png')
              : {uri: article.urlToImage}
          }
          onError={() => setBroken(true)}
          resizeMode="cover"
        />
        <Row>
          <Title numberOfLines={2}>{article.title}</Title>
          <Meta>
            {article.source?.name || 'Unknown'} •{' '}
            {formatDate(article.publishedAt)}
          </Meta>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};
