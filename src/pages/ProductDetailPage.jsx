import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductGallery from "../components/product/ProductGallery";
import VariantSelector from "../components/product/VariantSelector";
import ProductPriceStock from "../components/product/ProductPriceStock";
import RelatedProductsByBrand from "../components/product/RelatedProductsByBrand";

import { useProductDetail } from "../hooks/useProductDetail";
import { buildAttributeMap, resolveVariant } from "../utils/variantUtils";
import { useCart } from "../hooks/useCart";
import { getUser } from "../utils/authStorage";

import { useSnackbar } from "notistack";
import Confetti from "react-confetti";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProductDetail(Number(id));
  const { addCartItem, getCartItems, cartItem, loading: cartLoading , success } =
    useCart();

  const { enqueueSnackbar } = useSnackbar();
  const user = getUser();

  const [selectedAttributes, setSelectedAttributes] = useState({});

  // Quantity
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [quantityError, setQuantityError] = useState("");

  // UI state
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  /* -------------------- DATA -------------------- */

  const attributeMap = useMemo(() => {
    if (!product) return {};
    return buildAttributeMap(product.variants);
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    const variant = resolveVariant(product.variants, selectedAttributes);
    return variant
      ? {
          ...variant,
          quantity: quantity || 1,
        }
      : null;
  }, [product, selectedAttributes, quantity]);

  /* -------------------- EFFECTS -------------------- */

  useEffect(() => {
    if (user) getCartItems();
  }, [success]);

  useEffect(() => {
    if (!selectedVariant || !cartItem) {
      setIsAlreadyInCart(false);
      return;
    }

    setIsAlreadyInCart(
      cartItem.some(
        (c) => c.product_variant_id === selectedVariant.id
      )
    );
  }, [selectedVariant, cartItem]);

  /* -------------------- HANDLERS -------------------- */

  const attributeOrder = Object.keys(attributeMap).map(Number);

  const handleSelect = (attrId, valueId) => {
    setSelectedAttributes((prev) => {
      const index = attributeOrder.indexOf(attrId);
      const updated = {};

      attributeOrder.forEach((id, i) => {
        if (i < index) updated[id] = prev[id];
      });

      if (prev[attrId] !== valueId) {
        updated[attrId] = valueId;
      }

      return updated;
    });
  };

  const validateAndCommitQuantity = (rawValue) => {
    if (!selectedVariant) return;

    const stock = selectedVariant.stock;
    const num = Number(rawValue);

    if (!rawValue || Number.isNaN(num)) {
      setQuantity(1);
      setQuantityInput("1");
      setQuantityError("Quantity must be a valid number");
      return;
    }

    if (num < 1) {
      setQuantity(1);
      setQuantityInput("1");
      setQuantityError("Minimum quantity is 1");
      return;
    }

    if (num > stock) {
      setQuantity(stock);
      setQuantityInput(String(stock));
      setQuantityError(`Only ${stock} items left in stock`);
      return;
    }

    setQuantity(num);
    setQuantityInput(String(num));
    setQuantityError("");
  };

  const increaseQty = () => {
    if (!selectedVariant) return;
    if (quantity < selectedVariant.stock) {
      const next = quantity + 1;
      setQuantity(next);
      setQuantityInput(String(next));
      setQuantityError("");
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      const next = quantity - 1;
      setQuantity(next);
      setQuantityInput(String(next));
      setQuantityError("");
    }
  };
  console.log("success",success)

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
      await addCartItem({
        product_variant_id: selectedVariant.id,
        quantity: selectedVariant.quantity,
        price: selectedVariant.price,
      });

      enqueueSnackbar("Added to cart successfully 🎉", {
        variant: "success",
      });

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } catch (err) {
      enqueueSnackbar("Failed to add item to cart", {
        variant: "error",
      });
    }
  };

  /* -------------------- RENDER -------------------- */

  if (loading)
    return <div className="p-10 text-center">Loading product…</div>;

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load product
      </div>
    );

  if (!product) return null;

  return (
    <>
      <Navbar />

      {showConfetti && <Confetti recycle={false} />}

      <div className="max-w-7xl mx-auto p-6 mt-24">
        <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl border p-6">
          {/* Gallery */}
          <div className="flex flex-col gap-12">
            <ProductGallery images={product.images} />
            {product.description && (
              <div>
                <h2 className="font-semibold text-lg mb-2">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold">
                {product.title}
              </h1>
              <p className="text-gray-500">
                {product.brand_name} · {product.model_name}
              </p>
            </div>

            <ProductPriceStock
              variant={selectedVariant}
              defaultPrice={product.default_price}
            />

            <VariantSelector
              attributeMap={attributeMap}
              variants={product.variants}
              selectedAttributes={selectedAttributes}
              onSelect={handleSelect}
            />

            {selectedVariant && (
              <div className="sticky top-24 bg-white border rounded-xl shadow-md p-4 space-y-4">
                {/* Quantity */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium">Quantity</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={decreaseQty}
                        disabled={quantity <= 1}
                        className="qty-btn"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        value={quantityInput}
                        onChange={(e) =>
                          setQuantityInput(e.target.value)
                        }
                        onBlur={(e) =>
                          validateAndCommitQuantity(e.target.value)
                        }
                        className={`w-16 text-center border rounded ${
                          quantityError
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      <button
                        onClick={increaseQty}
                        disabled={
                          quantity >= selectedVariant.stock
                        }
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    {quantityError && (
                      <p className="text-xs text-red-500 mt-1">
                        {quantityError}
                      </p>
                    )}
                  </div>

                  <div className="text-sm text-gray-600">
                    {selectedVariant.stock} in stock
                  </div>
                </div>

                {/* CTA */}
                <button
                  disabled={
                    !user ||
                    isAlreadyInCart ||
                    quantityError ||
                    selectedVariant.stock <= 0 
                    
                  }
                  onClick={handleAddToCart}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 transition py-3 rounded-lg text-white font-semibold disabled:opacity-50"
                >
                  {isAlreadyInCart
                    ? "Already in Cart"
                    : "Add to Cart"}
                </button>

                {!user && (
                  <p className="text-xs text-gray-500 text-center">
                    Please login to add items to cart
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {product.brand_id && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Related Products
            </h2>
            <RelatedProductsByBrand
              brandId={product.brand_id}
              currentProductId={product.id}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
