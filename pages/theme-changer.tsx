import { Layout } from "@/componets/layouts";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState, ChangeEvent, useEffect, FC } from "react";
import { GetServerSideProps } from "next";

import Cookies from "js-cookie";
import axios from 'axios';

interface Props {
  theme: string;
}

const ThemeChanger: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState<string>(theme);

  // console.log({ theme });

  const onThemeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    console.log({ selectedTheme });
    setCurrentTheme((prevState) => selectedTheme);

    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log({ data });
  }

  useEffect(() => {
    console.log("LocalStorage:", localStorage.getItem("theme"));
    console.log('Cookies', Cookies.get("theme"));
  }, []);

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={onThemeChanged}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>
            Solicitud
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ThemeChanger;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light', name = 'No name' } = req.cookies;

  const validThemes: string[] = ['light', 'dark', 'custom'];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'light',
      name
    },
  };
};
