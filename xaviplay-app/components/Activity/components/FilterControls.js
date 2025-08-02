import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput
} from 'react-native';

const FilterControls = ({ currentFilters, onFilterChange }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempFilters, setTempFilters] = useState(currentFilters);

  const sections = [
    'Matemáticas',
    'Ciencias',
    'Historia',
    'Literatura',
    'Arte',
    'Deportes',
    'Tecnología',
    'Idiomas'
  ];

  const difficulties = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
    { value: 'expert', label: 'Experto' }
  ];

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      section: null,
      difficulty: null
    };
    setTempFilters(resetFilters);
    onFilterChange(resetFilters);
    setShowFilterModal(false);
  };

  const hasActiveFilters = currentFilters.section || currentFilters.difficulty;

  const getFilterSummary = () => {
    const activeFilters = [];
    if (currentFilters.section) activeFilters.push(currentFilters.section);
    if (currentFilters.difficulty) {
      const difficulty = difficulties.find(d => d.value === currentFilters.difficulty);
      activeFilters.push(difficulty?.label || currentFilters.difficulty);
    }
    return activeFilters.join(', ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterHeader}>
        <TouchableOpacity
          style={[styles.filterButton, hasActiveFilters && styles.activeFilterButton]}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={[styles.filterButtonText, hasActiveFilters && styles.activeFilterButtonText]}>
            🔍 Filtros
          </Text>
        </TouchableOpacity>

        {hasActiveFilters && (
          <View style={styles.activeFiltersContainer}>
            <Text style={styles.activeFiltersText}>
              {getFilterSummary()}
            </Text>
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={handleResetFilters}
            >
              <Text style={styles.clearFiltersText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Filtro por sección */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Sección</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      !tempFilters.section && styles.selectedOptionButton
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, section: null })}
                  >
                    <Text style={[
                      styles.optionText,
                      !tempFilters.section && styles.selectedOptionText
                    ]}>
                      Todas
                    </Text>
                  </TouchableOpacity>
                  {sections.map((section) => (
                    <TouchableOpacity
                      key={section}
                      style={[
                        styles.optionButton,
                        tempFilters.section === section && styles.selectedOptionButton
                      ]}
                      onPress={() => setTempFilters({ ...tempFilters, section })}
                    >
                      <Text style={[
                        styles.optionText,
                        tempFilters.section === section && styles.selectedOptionText
                      ]}>
                        {section}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Filtro por dificultad */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Dificultad</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      !tempFilters.difficulty && styles.selectedOptionButton
                    ]}
                    onPress={() => setTempFilters({ ...tempFilters, difficulty: null })}
                  >
                    <Text style={[
                      styles.optionText,
                      !tempFilters.difficulty && styles.selectedOptionText
                    ]}>
                      Todas
                    </Text>
                  </TouchableOpacity>
                  {difficulties.map((difficulty) => (
                    <TouchableOpacity
                      key={difficulty.value}
                      style={[
                        styles.optionButton,
                        tempFilters.difficulty === difficulty.value && styles.selectedOptionButton
                      ]}
                      onPress={() => setTempFilters({ ...tempFilters, difficulty: difficulty.value })}
                    >
                      <Text style={[
                        styles.optionText,
                        tempFilters.difficulty === difficulty.value && styles.selectedOptionText
                      ]}>
                        {difficulty.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetFilters}
              >
                <Text style={styles.resetButtonText}>Limpiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeFiltersText: {
    fontSize: 12,
    color: '#1976D2',
    marginRight: 5,
  },
  clearFiltersButton: {
    backgroundColor: '#1976D2',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearFiltersText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOptionButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterControls; 