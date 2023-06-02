import React from "react"
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
export const Home = () => {
  
    

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: "cyan",
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));



function Card({ image, title, category }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      
    </Paper>
  );
}

const data = [
  {
    image:
      '/texture.jpg',
    title: 'Deprem yardım alanlarını bildir',
    category: 'İletişim',
  },
  {
    image:
      '/earth.jpg',
    title: 'Deprem sırasında yapılması gerekenler',
    category: 'güvenlik',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Deprem için hazırlık: önemli ipuçları',
    category: 'güvenlik',
  },
  {
    image:
      '/bag.jpg',
    title: 'Afet çantası hazırlığı: Temel ihtiyaçlar',
    category: 'hazırlık',
  },
  {
    image:
      '/world.jpg',
    title: 'Deprem sonrası hasar tespiti ve yardım',
    category: 'yardım',
  },
  // Daha fazla depremle ilgili içerikleri buraya ekleyebilirsiniz
];

function Demo() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
  <div>
    <Carousel
    
      slideSize="50%"
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={1}
    >
      {slides}
    </Carousel>
 

    
      <h1 className=" text-center font-extrabold">
        Deprem yardım uygulamasına hoşgeldiniz
      </h1>
      Olay bildirmek için konumunuzu açarak, olay bildir sayfasından çağrıda
      bulunabilirsiniz
    </div>
  )}
  return Demo()
}
