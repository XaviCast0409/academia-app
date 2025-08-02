import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        {/* Botón Anterior */}
        <TouchableOpacity
          style={[styles.pageButton, !hasPrevPage && styles.disabledButton]}
          onPress={() => hasPrevPage && onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          <Text style={[styles.pageButtonText, !hasPrevPage && styles.disabledText]}>
            ← Anterior
          </Text>
        </TouchableOpacity>

        {/* Números de página */}
        <View style={styles.pageNumbersContainer}>
          {getPageNumbers().map((page, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageNumberButton,
                page === currentPage && styles.activePageButton,
                page === '...' && styles.ellipsisButton
              ]}
              onPress={() => page !== '...' && onPageChange(page)}
              disabled={page === '...'}
            >
              <Text
                style={[
                  styles.pageNumberText,
                  page === currentPage && styles.activePageText,
                  page === '...' && styles.ellipsisText
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón Siguiente */}
        <TouchableOpacity
          style={[styles.pageButton, !hasNextPage && styles.disabledButton]}
          onPress={() => hasNextPage && onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          <Text style={[styles.pageButtonText, !hasNextPage && styles.disabledText]}>
            Siguiente →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información de página */}
      <View style={styles.pageInfo}>
        <Text style={styles.pageInfoText}>
          Página {currentPage} de {totalPages}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledText: {
    color: '#999',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pageNumberButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  activePageButton: {
    backgroundColor: '#007AFF',
  },
  ellipsisButton: {
    backgroundColor: 'transparent',
  },
  pageNumberText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activePageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ellipsisText: {
    color: '#999',
    fontSize: 16,
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageInfoText: {
    fontSize: 12,
    color: '#666',
  },
});

export default PaginationControls; 