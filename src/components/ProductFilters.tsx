import React from 'react';
import styled from 'styled-components';

interface FilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  availableColors: string[];
  availableSizes: string[];
}

const FilterContainer = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
`;

const PriceSlider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RangeInput = styled.input`
  flex: 1;
`;

const PriceDisplay = styled.span`
  min-width: 80px;
  text-align: right;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ColorOption = styled.button<{ isSelected: boolean; color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${props => props.isSelected ? '#000' : 'transparent'};
  background-color: ${props => props.color.toLowerCase()};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOption = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.isSelected ? '#000' : '#ddd'};
  background: ${props => props.isSelected ? '#000' : 'white'};
  color: ${props => props.isSelected ? 'white' : '#000'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isSelected ? '#333' : '#f5f5f5'};
  }
`;

const ProductFilters: React.FC<FilterProps> = ({
  priceRange,
  setPriceRange,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  availableColors,
  availableSizes,
}) => {
  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <FilterContainer>
      <FilterSection>
        <FilterTitle>Prix</FilterTitle>
        <PriceSlider>
          <RangeInput
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
          <PriceDisplay>{priceRange[1]}€</PriceDisplay>
        </PriceSlider>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Couleurs</FilterTitle>
        <FilterOptions>
          {availableColors.map(color => (
            <ColorOption
              key={color}
              color={color}
              isSelected={selectedColors.includes(color)}
              onClick={() => handleColorToggle(color)}
              title={color}
            />
          ))}
        </FilterOptions>
      </FilterSection>

      <FilterSection>
        <FilterTitle>Tailles</FilterTitle>
        <FilterOptions>
          {availableSizes.map(size => (
            <SizeOption
              key={size}
              isSelected={selectedSizes.includes(size)}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </SizeOption>
          ))}
        </FilterOptions>
      </FilterSection>
    </FilterContainer>
  );
};

export default ProductFilters;
