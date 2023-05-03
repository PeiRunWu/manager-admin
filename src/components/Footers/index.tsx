import { DefaultFooter } from '@ant-design/pro-components';
import './index.less';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      className="default-footer"
      copyright={`${currentYear} Manager-admin by CaroLe`}
    />
  );
};

export default Footer;
