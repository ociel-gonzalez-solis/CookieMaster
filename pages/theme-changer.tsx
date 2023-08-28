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

const ThemeChanger: FC = (props) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  console.log({ props });

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light', name = 'No name' } = req.cookies;

  return {
    props: {
      theme,
      name
    },
  };
};
