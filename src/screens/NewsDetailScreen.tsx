import React from 'react';
import {Linking, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {cleanText} from '../utils/cleanText';

type DetailRoute = RouteProp<RootStackParamList, 'NewsDetail'>; // ← здесь

export const NewsDetailScreen = () => {
  const {params} = useRoute<DetailRoute>();
  const {article} = params;

  const handleOpenBrowser = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };

  return (
    <Scroll>
      {article.urlToImage ? <Cover source={{uri: article.urlToImage}} /> : null}
      <Title>{article.title}</Title>
      <Meta>
        {article.author ? <MetaText>{article.author}</MetaText> : null}
        {article.source?.name ? (
          <MetaText>{article.source.name}</MetaText>
        ) : null}
        {article.publishedAt ? (
          <MetaText>{new Date(article.publishedAt).toLocaleString()}</MetaText>
        ) : null}
      </Meta>
      <Content>
        {cleanText(article.content) ||
          cleanText(article.description) ||
          'Нет текста'}
      </Content>
      {article.url ? (
        <OpenButton onPress={handleOpenBrowser}>
          <OpenButtonText>Открыть в браузере</OpenButtonText>
        </OpenButton>
      ) : null}
    </Scroll>
  );
};

const Scroll = styled(ScrollView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};
  padding: ${({theme}) => theme.spacing(2)}px;
`;

const Cover = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: ${({theme}) => theme.radius.lg}px;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing(1)}px;
`;

const Meta = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
`;

const MetaText = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.subtext};
`;

const Content = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing(3)}px;
`;

const OpenButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${({theme}) => theme.spacing(1.5)}px;
  border-radius: ${({theme}) => theme.radius.md}px;
  align-items: center;
`;

const OpenButtonText = styled.Text`
  color: ${({theme}) => theme.colors.bg};
  font-size: 16px;
  font-weight: bold;
`;
