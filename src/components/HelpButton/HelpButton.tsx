import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { Help } from 'tabler-icons-react';

const HelpButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="How to use this app"
      >
        <Text py="sm">
          The scanned data from the uploaded document is on the left side of the
          screen. You can drag those data to form values in the middle. You can
          see the realtime changes on the right.
        </Text>
        <Text>Generate the JSON data when you are satisfied.</Text>
      </Modal>
      <ActionIcon
        variant="transparent"
        color="blue"
        onClick={() => setOpened(true)}
      >
        <Help />
      </ActionIcon>

      {/* <Button leftIcon={<Help />}>Help</Button> */}
    </>
  );
};

export default HelpButton;
