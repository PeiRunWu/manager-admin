import { BlogArticleType } from '@/repository/blog/BlogArticle';
import {
  getBlogArticleById,
  saveArticle,
  updateBlogArticleById,
} from '@/services/blog/BlogArticleService';
import { getBlogTagTreeNode } from '@/services/blog/blogTagService';
import { deleteOssFile } from '@/services/oss/ossService';
import {
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { Modal, TreeSelect, message } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import styles from './index.less';
const WriteArticle: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [htmlValue, setHtmlValue] = useState<string>('');
  const [record, setRecord] = useState<BlogArticleType.BlogArticle>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    const handleGetBlogArticle = async () => {
      if (id) {
        const response = await getBlogArticleById(id);
        if (response.code === 200) {
          setHtmlValue(response.data.articleContent);
          setRecord(response.data);
          setTimeout(() => {
            setSelectedValues(response.data.articleTag);
          }, 100);
          setFileList(
            response.data.cover
              ? [
                  {
                    uid: '-1',
                    name: 'avatar.jpg',
                    status: 'done',
                    url: response.data.cover,
                  },
                ]
              : [],
          );
        }
      }
    };
    handleGetBlogArticle();
  }, [id]);

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
      after: () => {
        vditor.setValue(htmlValue);
      },
      input: () => {
        setHtmlValue(vditor.getHTML());
      },
    });
  }, [htmlValue]);
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
  const handleRemove = async (file: UploadFile) => {
    await deleteOssFile({ fileName: file.response });
  };
  return (
    <PageContainer>
      <div id="vditor" className="vditor" />
      <div className={styles.main}>
        <ProForm<BlogArticleType.BlogArticle>
          className={styles.proForm}
          key={record ? record.id : 'id'}
          initialValues={{
            articleTitle: record?.articleTitle,
            articleSummary: record?.articleSummary,
            articleType: record?.articleType,
            visibleRange: record?.visibleRange,
          }}
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
            let articleContent = htmlValue;
            if (!articleContent) {
              articleContent = localStorage.getItem('vditorvditor') || '';
            }
            const data = {
              ...values,
              articleContent: articleContent,
              articleTag: selectedValues,
            };
            if (values.file) {
              data.cover = values.file[0]?.response.data || '';
            }
            
            if (record && id) {
              data.id = id;
            }

            delete data.file;
            let response;
            if (record) {
              console.log(data);
              response = await updateBlogArticleById(data);
            } else {
              response = await saveArticle(data);
            }
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
            action={'/api/manager-third-party/oss/uploadOssFile'}
            fieldProps={{
              name: 'file',
              fileList: fileList,
              listType: 'picture-card',
              onPreview: handlePreview,
              onChange: handleChange,
              onRemove: handleRemove,
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
