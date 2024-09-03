import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table" as any,
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#000',
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  }
});

// Create Invoice Document Component
const InvoicePDF: React.FC<{}> = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Invoice for </Text>
      </View>
      <View style={styles.section}>
        <Text>Plan: Sliver</Text>
        <Text>Duration: 3 Months</Text>
        <Text>Start Date: 03-09-2024</Text>
        <Text>End Date: 03-12-2024</Text>
      </View>
      <View style={styles.table}>
        {/* You can define your table headers here */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Details</Text>
          </View>
        </View>
        {/* You can define your table rows here */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Membership</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}></Text>
          </View>
        </View>
        {/* Add more rows as needed */}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;