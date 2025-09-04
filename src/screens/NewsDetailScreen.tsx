import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Linking, ScrollView} from 'react-native';
import type {Article} from '../types/news';
import {formatDate} from '../utils/format';

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.bg};
`;
const Wrap = styled(ScrollView)`
  flex: 1;
`;
const Cover = styled.Image`
  width: 100%;
  max-height: 260px;
  height: 220px;
  background-color: #0f172a;
`;
const Box = styled.View`
  padding: ${({theme}) => theme.spacing(2)}px;
  gap: 8px;
`;
const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
`;
const Meta = styled.Text`
  color: ${({theme}) => theme.colors.subtext};
`;
const Body = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 16px;
  line-height: 22px;
`;
const LinkBtn = styled.TouchableOpacity`
  margin-top: 12px;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 12px 16px;
  border-radius: ${({theme}) => theme.radius.md}px;
  align-self: flex-start;
`;
const LinkText = styled.Text`
  color: #001815;
  font-weight: 800;
`;

export const NewsDetailScreen: React.FC<any> = ({route}) => {
  const {article} = route.params as {article: Article};
  const [broken, setBroken] = useState(false);

  return (
    <Screen>
      <Wrap>
        <Cover
          source={
            broken || !article.urlToImage
              ? require('../../assets/placeholder.png')
              : {uri: article.urlToImage}
          }
          onError={() => setBroken(true)}
          resizeMode="cover"
        />
        <Box>
          <Title>{article.title}</Title>
          <Meta>
            {article.author ? `${article.author} • ` : ''}
            {article.source?.name || 'Unknown'} •{' '}
            {formatDate(article.publishedAt)}
          </Meta>
          {article.description ? <Body>{article.description}</Body> : null}
          {article.content ? (
            <Body>
              {'\n'}
              {article.content}
            </Body>
          ) : null}

          {!!article.url && (
            <LinkBtn onPress={() => Linking.openURL(article.url)}>
              <LinkText>Открыть в браузере</LinkText>
            </LinkBtn>
          )}
        </Box>
      </Wrap>
    </Screen>
  );
};
