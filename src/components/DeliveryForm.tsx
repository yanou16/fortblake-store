import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

interface DeliveryFormProps {
  onSubmit: (deliveryInfo: DeliveryInfo) => void;
}

export interface DeliveryInfo {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  additionalInfo?: string;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DeliveryInfo>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs requis
    const requiredFields = ['fullName', 'address', 'city', 'postalCode', 'phone', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof DeliveryInfo]?.trim());
    
    if (missingFields.length > 0) {
      alert(`Veuillez remplir tous les champs obligatoires : ${missingFields.join(', ')}`);
      return;
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Veuillez entrer une adresse email valide');
      return;
    }

    // Validation du format du code postal (5 chiffres pour la France)
    const postalCodeRegex = /^\d{5}$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      alert('Le code postal doit contenir 5 chiffres');
      return;
    }

    // Validation du numéro de téléphone (format français)
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Veuillez entrer un numéro de téléphone valide');
      return;
    }

    // Si toutes les validations sont passées, on soumet le formulaire
    onSubmit({
      ...formData,
      additionalInfo: formData.additionalInfo?.trim() || ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <FormContainer>
      <h2>Informations de livraison</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">Adresse</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">Ville</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="postalCode">Code postal</Label>
          <Input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="additionalInfo">Instructions supplémentaires (optionnel)</Label>
          <Input
            as="textarea"
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Confirmer la commande</Button>
      </Form>
    </FormContainer>
  );
};

export default DeliveryForm;
