export interface MenuItem {
  id: number; // Make id required and always a number
  name: string;
  price?: number;
  description?: string;
  category?: string | number | (string | number)[];
  category_id?: number;
  image_url?: string;
  original_image?: {
    local_url?: string;
  };
  is_available?: boolean;
  is_available_today?: boolean;
  image?: any; // For the image source object
}

export interface Category {
  id: number;
  name: string;
}

export interface MenuCategoryModalProps {
  visible: boolean;
  category: string | null;
  onClose: () => void;
  items?: MenuItem[];
  categoryId?: number | null;
  categories?: Category[];
}

export interface ChangeAvailabilityModalProps {
  visible: boolean;
  onClose: () => void;
  onChange: (option: string) => void;
  current: string;
  itemId: number;
}
