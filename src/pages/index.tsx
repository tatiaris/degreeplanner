import React from 'react';
import { Mheader } from '../components/Mheader';
import { Mnavbar } from '../components/Mnavbar/';
import { MFooter } from '../components/MFooter';
import { Col, Row, Button } from 'react-bootstrap';
const Home = (): React.ReactNode => {
  return (
    <>
      <Mheader title={'Home'} />
      <Mnavbar theme={'dark'} />
      <Row id="page_container" style={{ margin: '0px' }}>
        <Col sm="2" style={{ padding: '15px' }}>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'white' }}>Engineering</p>
          <Button
            href="/major/csce"
            style={{
              width: '100%',
              borderRadius: '0px',
              textAlign: 'left',
              marginBottom: '15px'
            }}>
            Computer Science
            <span style={{ float: 'right', fontWeight: 'bold' }}>-&gt;</span>
          </Button>
          <Button
            href="/major/chen"
            style={{
              width: '100%',
              borderRadius: '0px',
              textAlign: 'left',
              marginBottom: '15px'
            }}>
            Chemical Engineering
            <span style={{ float: 'right', fontWeight: 'bold' }}>-&gt;</span>
          </Button>
        </Col>
        <Col sm="2" style={{ padding: '15px' }}>
          <p style={{ fontSize: '2em', fontWeight: 'bold', color: 'white' }}>Science</p>
          <Button
            href="/major/math"
            style={{
              width: '100%',
              borderRadius: '0px',
              textAlign: 'left',
              marginBottom: '15px'
            }}>
            Mathematics
            <span style={{ float: 'right', fontWeight: 'bold' }}>-&gt;</span>
          </Button>
          <Button
            href="/major/phys"
            style={{
              width: '100%',
              borderRadius: '0px',
              textAlign: 'left',
              marginBottom: '15px'
            }}>
            Physics
            <span style={{ float: 'right', fontWeight: 'bold' }}>-&gt;</span>
          </Button>
        </Col>
      </Row>

      <MFooter />
    </>
  );
};

export default Home;
