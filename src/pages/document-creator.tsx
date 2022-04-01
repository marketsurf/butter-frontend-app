import { DocumentContext } from '@/common/context/document';

import DocumentBuilderLayout from '@/components/DocumentBuilderLayout';
import FormContainer from '@/components/FormContainer';
import PreviewContainer from '@/components/PreviewContainer';
import { convertJsonToForm } from '@/utils/formatData';
import { getConfigFile } from '@/utils/helpers';

import { Box, createStyles } from '@mantine/core';
import { formList, useForm } from '@mantine/form';
import { useListState } from '@mantine/hooks';
import { useRouter } from 'next/router';

import React, { useContext, useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const DocumentCreator = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const { documentType, documentContent } = useContext(DocumentContext);
  const [state, handlers] = useListState(documentContent);
  const { classes } = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
    // check if documentType or documentContent is empty then redirect to /
    if (documentType === '' || documentContent.length === 0) {
      router.push('/');
    }
  }, []);

  const configShape = getConfigFile(documentType);

  const form = useForm({
    initialValues: {
      data: formList(convertJsonToForm(configShape ?? {})),
    },
  });

  return isBrowser ? (
    <DocumentBuilderLayout form={form} state={state} handlers={handlers}>
      <Box className={classes.root}>
        <FormContainer documentType={documentType} form={form} />
        <PreviewContainer form={form} />
      </Box>
    </DocumentBuilderLayout>
  ) : null;
};

export default DocumentCreator;
