import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import NextLink from 'next/link';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function ProductScreen(props) {
  const { product } = props;
  const classes = useStyles();
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>
              <b>back to products</b>
            </Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                <b>{product.name}</b>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>Category: {product.category}</b>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>Brand {product.brand}</b>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>
                  Rating: {product.rating} stars ({product.numReviews} reviews)
                </b>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <b>
                  Description:
                  {product.description}
                </b>
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <b>Price</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <b>${product.price}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <b>Status</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      <b>
                        {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
