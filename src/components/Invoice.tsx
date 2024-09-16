import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10, // Reduced font size
    marginBottom: 4,
  },
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 4,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '25%',
    padding: 4,
  },
  tableCell: {
    fontSize: 10,
    width: '25%',
    padding: 4,
  },
  totalAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
});

// Define the PDF structure for the invoice
const Invoice: React.FC<{ invoiceData: any }> = ({ invoiceData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
        </View>

        {/* Billing From and To */}
        <View style={[styles.section, { flexDirection: 'row', justifyContent: 'space-between' }]}>
          <View>
            <Text style={styles.heading}>Billing From:</Text>
            <Text style={styles.text}>Veer Fitness</Text>
            <Text style={styles.text}>Email: contact@veerfitnessbhopal.com</Text>
            <Text style={styles.text}>Address: G-2/115 Arihant Complex, Road, Gulmohar Colony, Bhopal</Text>
          </View>
          <View>
            <Text style={styles.heading}>Billing To:</Text>
            <Text style={styles.text}>{invoiceData.billingTo.name}</Text>
            <Text style={styles.text}>Email: {invoiceData.billingTo.email}</Text>
            <Text style={styles.text}>Mobile: {invoiceData.billingTo.mobile}</Text>
          </View>
        </View>

        {/* Invoice Details */}
        <View style={styles.section}>
          <Text style={styles.text}>Invoice ID: {invoiceData.invoiceId}</Text>
          <Text style={styles.text}>Past Expiry Date: {invoiceData.pastExpiryDate}</Text>
          <Text style={styles.text}>New Expiry Date: {invoiceData.newExpiryDate}</Text>
          <Text style={styles.text}>Extended On: {invoiceData.extendedOn}</Text>
        </View>

        {/* Plan Information */}
        <View style={styles.section}>
          <Text style={styles.heading}>Membership Plan</Text>
          {/* Flexbox Table */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Plan Name</Text>
            <Text style={styles.tableCellHeader}>Description</Text>
            <Text style={styles.tableCellHeader}>Duration</Text>
            <Text style={[styles.tableCellHeader, { textAlign: 'right' }]}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{invoiceData.planName}</Text>
            <Text style={styles.tableCell}>{invoiceData.planDescription}</Text>
            <Text style={styles.tableCell}>{invoiceData.planDuration}</Text>
            <Text style={[styles.tableCell, { textAlign: 'right' }]}>{invoiceData.amount}</Text>
          </View>
        </View>

        {/* Total Amount */}
        <View style={styles.section}>
          <Text style={styles.totalAmount}>Total Amount: {invoiceData.totalAmount}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
