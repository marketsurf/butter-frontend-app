import { convertFormToJson } from '@/utils/formatData';
import {
  Button,
  Code,
  createStyles,
  Paper,
  Text,
  Tooltip,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useDisclosure } from '@mantine/hooks';
import { Prism } from '@mantine/prism';
import React, { useEffect, useState } from 'react';
import { ArrowBarRight } from 'tabler-icons-react';

const mockForm = {
  employees: [
    {
      name: '',
      active: true,
    },
    {
      name: '',
      active: true,
    },
  ],
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: theme.spacing.sm,
    width: '450px',
    height: 'calc(100vh - 60px)',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.gray[2]
    }`,
    transition: 'all 0.3s ease-in-out',
  },

  wrapperClose: {
    width: '70px',
  },

  previewText: {
    color: theme.colors.gray[5],
    fontSize: theme.fontSizes.sm,
    marginBottom: theme.spacing.sm / 2,
  },
  minimizeButton: {
    marginBottom: theme.spacing.sm,
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
  mainLinkActive: {
    '&, &:hover': {
      color: theme.colors.yellow[theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface PreviewContainerProps {
  form: UseFormReturnType<{
    data: FormList<{
      key: string;
      value: string;
    }>;
  }>;
}

const PreviewContainer = ({ form }: PreviewContainerProps) => {
  const { classes, cx } = useStyles();
  const [opened, handlers] = useDisclosure(true);

  const MinimizeButton = () => (
    <Tooltip
      label={'Open Preview'}
      position="left"
      withArrow
      transitionDuration={0}
    >
      <UnstyledButton
        onClick={handlers.toggle}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]: opened,
        })}
      >
        <ArrowBarRight />
      </UnstyledButton>
    </Tooltip>
  );

  return (
    <div className={cx(classes.wrapper, { [classes.wrapperClose]: !opened })}>
      <MinimizeButton />
      <Transition
        mounted={opened}
        transition="fade"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <>
            <Text className={classes.previewText} style={styles}>
              Preview:
            </Text>
            <Prism language="json" style={styles}>
              {JSON.stringify(convertFormToJson(form.values.data), null, 2)}
            </Prism>
          </>
        )}
      </Transition>
    </div>
  );
};

export default PreviewContainer;
