import React, { useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store/store';

const Invoice: React.FC<{ invoiceData: any  }> = ({ invoiceData  }) => {

    // Custom fonts or any specific design changes
    Font.register({
        family: 'Helvetica',
        fonts: [
        { src: 'https://path-to-your-custom-font.ttf' },
        ]
    });
  
    const styles = StyleSheet.create({
        page: {
          padding: 20,
          fontFamily: 'Helvetica',
          color: '#fff',
          backgroundColor: '#192A38',
        },
        section: {
          marginBottom: 20,
        },
        header: {
          fontSize: 16,
          marginBottom: 10,
          textAlign: 'left',
          color: '#fff',
        },
        invoiceTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        twoColumns: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        column: {
          width: '48%',
        },
        invoiceDetails: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#444',
          paddingVertical: 5,
          marginBottom: 10,
        },
        tableHeader: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        tableRow: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 4,
        },
        totalSection: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderColor: '#444',
          paddingVertical: 5,
          marginTop: 10,
        },
        bold: {
          fontWeight: 'bold',
        },
        greenText: {
          color: '#00FF00',
        },
      });

    return (
        <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
        </View>

        {/* Billing From and To */}
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <Text style={styles.header}>Billing From:</Text>
            <Text>Veer Fitness</Text>
            <Text>Email: contact@veerfitnessbhopal.com</Text>
            <Text>Address: G-2/115 Arihant Complex, Road, Gulmohar Colony, Bhopal</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.header}>Billing To:</Text>
            <Text>{invoiceData.billingTo.name}</Text>
            <Text>Email: {invoiceData.billingTo.email}</Text>
            <Text>Mobile: {invoiceData.billingTo.mobile}</Text>
          </View>
        </View>

        {/* Invoice details */}
        <View style={styles.invoiceDetails}>
          <View>
            <Text style={styles.bold}>Invoice ID: </Text>
            <Text>#{invoiceData.invoiceId}</Text>
          </View>
          <View>
            <Text style={styles.bold}>Past Expiry Date:</Text>
            <Text>{invoiceData.pastExpiryDate}</Text>
          </View>
          <View>
            <Text style={styles.bold}>New Expiry Date:</Text>
            <Text>{invoiceData.newExpiryDate}</Text>
          </View>
          <View>
            <Text style={styles.bold}>Extended On:</Text>
            <Text>{invoiceData.extendedOn}</Text>
          </View>
        </View>

        {/* Membership Table */}
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Membership Plan</Text>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Duration</Text>
            <Text style={styles.tableHeader}>Amount</Text>
          </View>

          <View style={styles.tableRow}>
            <Text>{invoiceData.planName}</Text>
            <Text>{invoiceData.planDescription}</Text>
            <Text>{invoiceData.planDuration}</Text>
            <Text>{invoiceData.amount}</Text>
          </View>
        </View>

        {/* Total Amount Section */}
        <View style={styles.totalSection}>
          <Text style={styles.bold}>Total Amount</Text>
          <Text style={[styles.bold, styles.greenText]}>₹{invoiceData.totalAmount}</Text>
        </View>
      </Page>
    </Document>
    );
}

export default Invoice;