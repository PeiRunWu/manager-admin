import { GithubFilled, WechatFilled } from '@ant-design/icons';

export const GithubAction = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://github.com/');
      }}
    >
      <GithubFilled />
    </div>
  );
};

export const Wechat = () => {
  return <WechatFilled />;
};
