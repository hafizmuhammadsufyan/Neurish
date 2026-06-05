import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import NUTRITION_DATA from '../data/nutrition';
import NutritionCard from '../components/nutrition/NutritionCard';
import RecipeModal from '../components/nutrition/RecipeModal';
import AgeGroupFilter from '../components/nutrition/AgeGroupFilter';
import { Leaf, TrendingUp, BookOpen, ShieldCheck, Users, AlertTriangle } from 'lucide-react';

export default function Nutrition() {
  const { activeChild, calculateAge } = useApp();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('1-2');
  const [selectedNutrition, setSelectedNutrition] = useState(null);

  // Filter nutrition data by selected age group
  const filteredNutrition = useMemo(() => {
    return NUTRITION_DATA.filter(item => item.ageGroupValue === selectedAgeGroup);
  }, [selectedAgeGroup]);

  const childAge = activeChild ? calculateAge(activeChild.dob) : '';
  const childName = activeChild?.name || 'Your Child';

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <Leaf size={32} style={{ color: 'var(--primary)' }} />
          <h1 className="text-3xl font-bold">Nutrition & Development Hub</h1>
        </div>
        <p className="text-sm text-secondary-color">
          Evidence-based nutrition guidance for <span className="font-semibold text-primary-color">{childName}</span>'s brain and physical development
        </p>
      </div>

      {/* Info Banner */}
      <div style={{ 
        backgroundColor: 'var(--primary-light)', 
        border: '1px solid var(--primary-border)', 
        padding: '16px 20px', 
        borderRadius: 'var(--radius-lg)', 
        display: 'flex', 
        gap: 16, 
        marginBottom: 32, 
        alignItems: 'flex-start' 
      }}>
        <div style={{ color: 'var(--primary)', marginTop: 2 }}><Leaf size={20} /></div>
        <div>
          <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 4 }}>
            Nutrition for Optimal Development
          </h4>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
            Every food recommended here supports both brain development (neural connections, cognitive function) and physical development (growth, immunity). Our recommendations are based on peer-reviewed research and age-appropriate guidelines. Always consult your pediatrician before introducing new foods.
          </p>
        </div>
      </div>

      {/* Development Benefits Grid */}
      <div className="grid grid-2" style={{ gap: '16px', marginBottom: 32 }}>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
            <h3 className="text-sm font-bold text-primary-color">Brain Growth</h3>
          </div>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
            Fatty acids, minerals, and vitamins that build neural connections and support cognitive development.
          </p>
        </div>
        <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
            <h3 className="text-sm font-bold text-primary-color">Body Growth</h3>
          </div>
          <p className="text-xs text-secondary-color" style={{ margin: 0, lineHeight: 1.5 }}>
            Proteins, minerals, and nutrients that support muscle development, bone strength, and immunity.
          </p>
        </div>
      </div>

      {/* Age Group Filter */}
      <div style={{ marginBottom: 24 }}>
        <h3 className="text-sm font-bold text-primary-color" style={{ marginBottom: 12 }}>
          Select Age Group
        </h3>
        <AgeGroupFilter 
          selectedAgeGroup={selectedAgeGroup}
          onSelectAgeGroup={setSelectedAgeGroup}
        />
      </div>

      {/* Nutrition Cards Grid */}
      <div className="grid grid-2" style={{ gap: '24px', marginBottom: 40 }}>
        {filteredNutrition.length > 0 ? (
          filteredNutrition.map(nutrition => (
            <NutritionCard
              key={nutrition.id}
              nutrition={nutrition}
              onOpen={() => setSelectedNutrition(nutrition)}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', padding: 40, textAlign: 'center' }}>
            <Leaf size={48} style={{ color: 'var(--border)', margin: '0 auto 16px', opacity: 0.3 }} />
            <p className="text-sm text-muted-color">No foods found for this age group.</p>
          </div>
        )}
      </div>

      {/* Research & Guidance Section */}
      <div className="card" style={{ padding: 24, marginBottom: 40, backgroundColor: '#F3F4F6' }}>
        <h3 className="text-base font-bold text-primary-color" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} /> Feeding Guidelines & Best Practices
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            {/* <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Bottle size={16} /> Starting Solids (6 Months)</h4> */}
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Begin with single-grain cereals and soft fruits. Introduce one new food every 3-5 days to monitor for allergies. Watch for signs of readiness: sitting upright, loss of tongue-thrust reflex, interest in food.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Users size={16} /> Meal Variety (8-12 Months)</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Combine proteins, grains, fruits, and vegetables. Offer foods with different textures (smooth, lumpy, finger foods). Continue breastfeeding or formula alongside solids.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><Users size={16} /> Family Foods (12+ Months)</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Transition to family meals with appropriate modifications. Avoid honey (botulism risk under 1 year), added salt, and sugar. Encourage self-feeding with age-appropriate finger foods.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-color" style={{ marginBottom: 6 }}><AlertTriangle size={16} /> Allergy Prevention</h4>
            <p className="text-sm text-secondary-color" style={{ margin: 0, lineHeight: 1.6 }}>
              Early introduction of allergenic foods (peanuts, eggs, fish) is associated with reduced allergy risk. Introduce one allergen at a time during the day in case a reaction occurs.
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal 
        nutrition={selectedNutrition}
        onClose={() => setSelectedNutrition(null)}
      />
    </div>
  );
}
