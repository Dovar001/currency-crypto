import { LinearProgress, Stack } from "@mui/material";
import { FC } from "react";

const LinearLoading: FC = () => {
  return (
    <Stack spacing={3} width="100%" marginTop={3} marginBottom={3}>
      <LinearProgress color="secondary" variant="query" />
      <LinearProgress color="inherit" variant="indeterminate" />
      <LinearProgress color="success" variant="indeterminate" />
    </Stack>
  );
};

export { LinearLoading };
