import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { fetchArtworks } from '../api/artworks';
import type { Artwork } from '../types/artwork';
import SelectOverlay from './SelectOverlay';

// keeping page size fixed
const ROWS_PER_PAGE = 12;

const ArtTable = () => {
  // data related state
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // selection is tracked only by ids
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());

  // used for custom bulk selection
  const [selectCount, setSelectCount] = useState<number | null>(null);

  // fetch only current page data
  useEffect(() => {
    setLoading(true);

    fetchArtworks(page).then((res) => {
      setArtworks(res.data);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page]);


  // this avoids storing rows from other pages
  const selectedRowsOnPage = artworks.filter((row, index) => {
    const globalIndex = (page - 1) * ROWS_PER_PAGE + index + 1;

    // auto selected when user uses custom select count
    const autoSelected =
      selectCount !== null &&
      globalIndex <= selectCount &&
      !deselectedIds.has(row.id);

    // manually selected rows
    const manuallySelected =
      selectedIds.has(row.id) && !deselectedIds.has(row.id);

    return autoSelected || manuallySelected;
  });

  
  // logic only touches rows on current page
  const onSelectionChange = (e: any) => {
    const currentPageSelected = e.value as Artwork[];

    const newSelected = new Set(selectedIds);
    const newDeselected = new Set(deselectedIds);

    // first assume all rows on page are deselected
    artworks.forEach((row) => {
      newDeselected.add(row.id);
      newSelected.delete(row.id);
    });

    // then re-add selected ones
    currentPageSelected.forEach((row) => {
      newSelected.add(row.id);
      newDeselected.delete(row.id);
    });

    setSelectedIds(newSelected);
    setDeselectedIds(newDeselected);
  };

  return (
    <div>
      {/* overlay only controls selectCount */}
      <SelectOverlay
        selectCount={selectCount}
        setSelectCount={setSelectCount}
      />

      <DataTable
        value={artworks}
        paginator
        lazy
        loading={loading}
        rows={ROWS_PER_PAGE}
        totalRecords={total}
        first={(page - 1) * ROWS_PER_PAGE}
        onPage={(e) => {
  if (typeof e.page === 'number') {
    setPage(e.page + 1);
  }
}}

        dataKey="id"
        selectionMode="checkbox"
        selection={selectedRowsOnPage}
        onSelectionChange={onSelectionChange}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start" />
        <Column field="date_end" header="End" />
      </DataTable>
    </div>
  );
};

export default ArtTable;
