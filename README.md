# NewsRN (React Native CLI + TypeScript)

Демо-приложение новостей (NewsAPI). Стек: **React Native CLI (0.74)**, **TypeScript**, **React Navigation (Stack)**, **Styled Components**, **Axios**.

## Фичи
- Лента новостей с пагинацией (10/стр.)
- Карточки: заголовок, источник, дата, изображение/заглушка
- Поиск по ключевым словам (по кнопке «Поиск»)
- Фильтры: технологии (без «игровых» новостей), спорт, политика (расширенный запрос)
- Лоадеры, обработка ошибок, pull-to-refresh
- Детальная страница: заголовок, изображение, текст, автор, дата, «Открыть в браузере»

## Требования
- Node.js >= 18
- JDK 17
- Android SDK 34 (Platform-Tools, Build-Tools, Emulator)
- (опц.) Xcode для iOS

## Установка
```bash
git clone <repo-url>
cd NewsRN
npm i
