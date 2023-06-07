import { BlogArticle } from '@/repository/blog/BlogArticle';
import { saveArticle } from '@/services/blog/BlogArticleService';
import { getBlogTagTreeNode } from '@/services/blog/blogTagService';
import {
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Modal, TreeSelect, message } from 'antd';
import { UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import styles from './index.less';
const WriteArticle: React.FC = () => {
  const [htmlValue, setHtmlValue] = useState<string>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);
  useEffect(() => {
    const vditor = new Vditor('vditor', {
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        'upload',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'fullscreen',
        'edit-mode',
        {
          name: 'more',
          toolbar: [
            'both',
            'code-theme',
            'content-theme',
            'export',
            'outline',
            'preview',
            'devtools',
          ],
        },
      ],
      cache: {
        enable: true,
      },
      counter: {
        enable: false,
        type: 'markdown',
      },
      lang: 'zh_CN',
      height: 500,
      after: undefined,
      input: () => {
        setHtmlValue(vditor.getHTML());
      },
    });
  }, []);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };
  const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
    const lastFile = newFileList.slice(-1);
    setFileList(lastFile);
    if (lastFile && lastFile[0]?.response) {
    }
  };
  return (
    <PageContainer>
      <div id="vditor" className="vditor" />
      <div className={styles.main}>
        <ProForm<BlogArticle.BlogArticle>
          className={styles.proForm}
          layout="horizontal"
          submitter={{
            searchConfig: {
              submitText: '发布',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
          onFinish={async (values) => {
            let articleContent = values.articleContent;
            if (!articleContent) {
              articleContent = localStorage.getItem('vditorvditor') || '';
            }
            const data = {
              ...values,
              articleContent: articleContent,
              articleTag: selectedValues,
            };
            if (values.file) {
              data.cover = values.file[0]?.response || '';
            }
            delete data.file;
            const response = await saveArticle(data);
            if (response.code === 200) {
              localStorage.removeItem('vditorvditor');
              history.push('/blog/article/list');
            }
            return true;
          }}
        >
          <ProFormText
            name="articleTitle"
            label="文章标题"
            width={'lg'}
            rules={[{ required: true, message: '请输入文章标题!' }]}
            fieldProps={{
              maxLength: 20,
              showCount: true,
            }}
          />
          <ProFormTreeSelect
            label="文章标签"
            name={'articleTag'}
            width={'lg'}
            request={async () => {
              const response = await getBlogTagTreeNode();
              return response.data;
            }}
            fieldProps={{
              fieldNames: {
                label: 'title',
              },
              treeCheckable: true,
              showCheckedStrategy: TreeSelect.SHOW_CHILD,
              placeholder: '添加文章标签',
              filterTreeNode: (inputValue, treeNode) => {
                if (typeof treeNode.title === 'string') {
                  return treeNode.title.includes(inputValue);
                }
                return false;
              },
              onChange: (values) => {
                if (values.length > 3) {
                  message.error('最多只能选择3个标签');
                  return;
                }
                setSelectedValues(values);
              },
              value: selectedValues,
            }}
          />
          <ProFormUploadButton
            name="file"
            label="添加封面"
            max={1}
            action={'/api/manager-system/system/oss/file'}
            fieldProps={{
              name: 'file',
              fileList: fileList,
              listType: 'picture-card',
              onPreview: handlePreview,
              onChange: handleChange,
            }}
          />
          <ProFormTextArea
            colProps={{ span: 24 }}
            name="articleSummary"
            label="文章摘要"
            allowClear
            width={'xl'}
            rules={[{ required: true, message: '请输入文章摘要!' }]}
            placeholder={'摘要：会在推荐、列表等场景外露，帮助读者快速了解内容'}
            fieldProps={{
              maxLength: 200,
              showCount: true,
            }}
          />
          <ProFormRadio.Group
            name="articleType"
            label="文章类型"
            rules={[{ required: true, message: '请输入文章类型!' }]}
            options={[
              {
                label: '原创',
                value: 0,
              },
              {
                label: '转载',
                value: 1,
              },
              {
                label: '翻译',
                value: 2,
              },
            ]}
          />
          <ProFormRadio.Group
            name="visibleRange"
            label="可见范围"
            rules={[{ required: true, message: '请输入可见范围!' }]}
            options={[
              {
                label: '全部可见',
                value: 0,
              },
              {
                label: '仅我可见',
                value: 1,
              },
            ]}
          />
        </ProForm>
        <Modal
          open={previewVisible}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    </PageContainer>
  );
};

export default WriteArticle;
